"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Users, Briefcase, CheckCircle } from "lucide-react"

const services = [
  {
    title: "Security Audit",
    description:
      "[CONTENT: Comprehensive assessment of your AI agent infrastructure, identifying vulnerabilities and providing actionable remediation plans]",
    features: ["Threat modeling", "Penetration testing", "Compliance review", "Risk assessment"],
  },
  {
    title: "Implementation Support",
    description:
      "[CONTENT: Expert guidance for deploying AgentShield in your environment, including architecture design and integration assistance]",
    features: ["Architecture design", "Integration planning", "Performance optimization", "Training workshops"],
  },
  {
    title: "Managed Security",
    description:
      "[CONTENT: Ongoing security monitoring and management for your AI agent deployments with 24/7 threat response]",
    features: ["24/7 monitoring", "Incident response", "Regular updates", "Compliance reporting"],
  },
]

export function ConsultingSection() {
  return (
    <section id="consulting" className="py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <Briefcase className="h-4 w-4" />
              <span className="text-sm font-semibold">Security Consulting</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Expert Security Guidance</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Our team of AI security experts helps enterprises build and maintain secure AI agent infrastructures.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Ready to Secure Your AI Infrastructure?</h3>
                  <p className="text-primary-foreground/90 leading-relaxed">
                    [CONTENT: Call to action emphasizing the expertise of the consulting team, successful client
                    outcomes, and the importance of proactive security]
                  </p>
                </div>
                <Button size="lg" variant="secondary" className="flex-shrink-0">
                  <Users className="mr-2 h-5 w-5" />
                  Schedule Consultation
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-bold mb-4">Why Choose Our Team?</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>[CONTENT: Years of experience in AI security and formal verification]</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>[CONTENT: Published research in top security conferences]</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>[CONTENT: Proven track record with Fortune 500 companies]</span>
                </li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-bold mb-4">Client Success Stories</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                [CONTENT: Brief case study or testimonial from a client who successfully implemented AgentShield with
                consulting support, highlighting measurable outcomes]
              </p>
              <Button variant="outline">View Case Studies</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
