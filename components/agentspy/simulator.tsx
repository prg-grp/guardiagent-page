'use client';

import { ModelPicker, StepNumber, TaskPicker } from '@/components/agentspy/simulator/picker';
import { RunProgress, reducedStepDurations, runSteps, stepDurations } from '@/components/agentspy/simulator/progress';
import { Report } from '@/components/agentspy/simulator/report';
import { Button } from '@/components/ui/button';
import { demoHarness, demoModels, demoTasks, type DemoModelId, type DemoTaskId } from '@/lib/agentspy-demo';
import { Info, Play } from 'lucide-react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

// Replay of recorded AgentSpy executions. Nothing runs: "Run AgentSpy" plays a short staged progress and then shows
// the report computed from lib/agentspy-demo-data.ts. The page places this inside its own section (id="simulator").

type Phase = 'idle' | 'running' | 'done';

// Preselect the paper's worked example (glm-5.3-flash on citation-check, Table 2, §3.4.3) so one click shows it.
const initialModel: DemoModelId = 'glm-5.3-flash';
const initialTask: DemoTaskId = 'citation-check';

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function AgentSpySimulator() {
  const uid = useId();
  const [modelId, setModelId] = useState<DemoModelId>(initialModel);
  const [taskId, setTaskId] = useState<DemoTaskId>(initialTask);
  const [phase, setPhase] = useState<Phase>('idle');
  const [step, setStep] = useState(0);
  const [runCount, setRunCount] = useState(0);
  const [announcement, setAnnouncement] = useState('');

  const timers = useRef<number[]>([]);
  const pickerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const runButtonRef = useRef<HTMLButtonElement>(null);

  const model = demoModels.find((m) => m.id === modelId) ?? demoModels[0];
  const task = demoTasks.find((t) => t.id === taskId) ?? demoTasks[0];

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const reset = useCallback(() => {
    clearTimers();
    setPhase('idle');
    setStep(0);
    setAnnouncement('');
  }, [clearTimers]);

  const run = useCallback(() => {
    clearTimers();
    const durations = prefersReducedMotion() ? reducedStepDurations : stepDurations;
    setPhase('running');
    setStep(0);
    setRunCount((n) => n + 1);
    setAnnouncement(`Replaying recorded runs. ${runSteps[0]}.`);
    let at = 0;
    durations.forEach((d, i) => {
      at += d;
      const id = window.setTimeout(() => {
        if (i + 1 < runSteps.length) {
          setStep(i + 1);
          setAnnouncement(`${runSteps[i + 1]}.`);
        } else {
          setStep(runSteps.length);
          setPhase('done');
          setAnnouncement('Report ready.');
        }
      }, at);
      timers.current.push(id);
    });
  }, [clearTimers]);

  // Bring the progress panel into view when a run starts, and move focus to the report heading when it arrives.
  // "Run again" inside the report unmounts its own button, so focus falls back to the main run button.
  useEffect(() => {
    // 'instant', not 'auto': globals.css sets html { scroll-behavior: smooth }, which 'auto' would inherit.
    const behavior = prefersReducedMotion() ? 'instant' : 'smooth';
    if (phase === 'running' && step === 0) {
      const active = document.activeElement;
      if (!active || active === document.body) runButtonRef.current?.focus({ preventScroll: true });
      progressRef.current?.scrollIntoView({ behavior, block: 'nearest' });
    }
    if (phase === 'done') {
      headingRef.current?.focus({ preventScroll: true });
      reportRef.current?.scrollIntoView({ behavior, block: 'start' });
    }
  }, [phase, step, runCount]);

  function selectModel(id: DemoModelId) {
    setModelId(id);
    reset();
  }

  function selectTask(id: DemoTaskId) {
    setTaskId(id);
    reset();
  }

  function changeSelection() {
    reset();
    const checked = pickerRef.current?.querySelector<HTMLInputElement>('input[type="radio"]:checked');
    checked?.focus({ preventScroll: true });
    pickerRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? 'instant' : 'smooth', block: 'start' });
  }

  const running = phase === 'running';

  return (
    <div className="min-w-0">
      <div ref={pickerRef} className="grid scroll-mt-24 gap-6 md:grid-cols-5 md:gap-8">
        <div className="md:col-span-2">
          <ModelPicker name={`${uid}-model`} value={modelId} onChange={selectModel} />
        </div>
        <div className="md:col-span-3">
          <TaskPicker name={`${uid}-task`} value={taskId} onChange={selectTask} />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-2xl border bg-background p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex min-w-0 gap-3">
          <StepNumber n={3} className="mt-0.5" />
          <div className="min-w-0">
            <p className="text-sm font-semibold">Run the replay</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              <span className="font-mono text-foreground">{model.id}</span>, {task.title}, 3 runs
            </p>
            <p className="mt-1.5 flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
              Replays recorded runs from the paper&apos;s experiments. Nothing runs in your browser.
            </p>
          </div>
        </div>
        <Button
          ref={runButtonRef}
          type="button"
          size="lg"
          onClick={() => {
            if (!running) run();
          }}
          aria-disabled={running}
          className="shrink-0 bg-spy text-white hover:bg-spy/90 focus-visible:ring-spy/40 aria-disabled:cursor-progress aria-disabled:opacity-70"
        >
          <Play aria-hidden />
          {running ? 'Running...' : phase === 'done' ? 'Run again' : 'Run AgentSpy'}
        </Button>
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>

      {phase === 'running' && (
        <div ref={progressRef} className="mt-6 scroll-mt-24">
          <RunProgress step={step} modelId={model.id} taskId={task.id} harness={demoHarness} />
        </div>
      )}

      {phase === 'done' && (
        <div ref={reportRef} className="mt-6 scroll-mt-24">
          <Report
            key={`${modelId}|${taskId}|${runCount}`}
            model={model}
            task={task}
            headingId={`${uid}-report`}
            headingRef={headingRef}
            onRunAgain={run}
            onChangeSelection={changeSelection}
          />
        </div>
      )}
    </div>
  );
}
