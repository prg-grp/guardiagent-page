"""Builds lib/agentspy-demo-data.ts from the AgentSpy example executions (set_comparison_report.json + codex rollouts)."""
import json, os, sys

src, out = sys.argv[1], sys.argv[2]
MODELS = {'gpt-5.6-terra': 'gpt-5.6-terra', 'or-ds-flash': 'deepseek-v4-flash', 'or-glm-flash': 'glm-5.3-flash'}
TASKS = ['citation-check', '3d-scan-calc', 'exceltable-in-ppt']
TOP = 10
SCOPES = {'command': 'commands', 'network': 'hosts', 'file': 'files'}
METRICS = {'command_overlap': 'commands', 'domain_overlap': 'hosts', 'file_overlap': 'files', 'mean': 'overall'}

def tool_calls(path):
    n = 0
    for line in open(path):
        d = json.loads(line)
        p = d.get('payload') or {}
        if d.get('type') == 'response_item' and isinstance(p, dict) and p.get('type') in ('custom_tool_call', 'function_call'):
            n += 1
    return n

data = {}
for folder, model in MODELS.items():
    for task in TASKS:
        base = os.path.join(src, f'{folder}_{task}')
        rep = json.load(open(os.path.join(base, 'set_comparison_report.json')))
        runs = rep['inputs']['a']
        # Resources per type: keep the TOP by max count across runs; aggregate the rest.
        resources = {}
        for scope, key in SCOPES.items():
            per_run = [next((f['counts'] for f in r['features'] if f['scope'] == scope), {}) for r in runs]
            names = sorted({n for c in per_run for n in c}, key=lambda n: (-max(c.get(n, 0) for c in per_run), n))
            top, rest = names[:TOP], names[TOP:]
            rows = [{'name': n, 'counts': [c.get(n, 0) for c in per_run], 'differs': len({c.get(n, 0) for c in per_run}) > 1} for n in top]
            other = None
            if rest:
                other = {'distinct': len(rest), 'counts': [sum(c.get(n, 0) for n in rest) for c in per_run]}
            resources[key] = {
                'rows': rows,
                'other': other,
                'distinct': [len(c) for c in per_run],
                'total': [sum(c.values()) for c in per_run],
            }
        sim = {}
        for c in rep['comparisons']:
            if c['axis'] != 'shape':
                continue
            sim[METRICS[c['metric']]] = {'pairs': c['a_self_scores'], 'mean': c['a_self_mean']}
        rollout_dir = os.path.join(base, 'rollouts')
        out_runs = []
        for i, r in enumerate(runs):
            out_runs.append({
                'tests': [r['tests']['passed'], r['tests']['total']],
                'seconds': round(r['agent_seconds']),
                'skillFiles': [r['skill_coverage']['accessed'], r['skill_coverage']['total']],
                'inputFiles': [r['environment_coverage']['accessed'], r['environment_coverage']['total']],
                'toolCalls': tool_calls(os.path.join(rollout_dir, f'rollout_{i + 1}.jsonl')),
            })
        data[f'{model}|{task}'] = {'runs': out_runs, 'resources': resources, 'similarity': sim}

ts = '// Generated from the AgentSpy example executions (codex CLI 0.146.0, three runs per model and task).\n'
ts += '// Source: set_comparison_report.json and rollout_N.jsonl for each model and task.\n// Regenerate: python3 scripts/build_agentspy_demo_data.py <example-dir> lib/agentspy-demo-data.ts\n\n'
ts += 'export const demoResults = ' + json.dumps(data, separators=(',', ':')) + ' as const;\n'
open(out, 'w').write(ts)
print('wrote', out, len(ts), 'bytes')
for k, v in data.items():
    print(k, 'overall', v['similarity']['overall']['mean'], 'toolCalls', [r['toolCalls'] for r in v['runs']], 'cmds', v['resources']['commands']['total'])
