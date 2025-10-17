'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { CheckCircle, Mail } from 'lucide-react';
import { useState } from 'react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState({
    research: true,
    product: true,
    consulting: true,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary/20 shadow-xl bg-background">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl md:text-4xl mb-2">Stay Informed</CardTitle>
              <CardDescription className="text-lg">
                Get the latest updates on AI agent security, research findings, and product releases.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 text-lg"
                  />
                </div>

                <div className="space-y-3">
                  <p className="font-semibold text-sm">I'm interested in:</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="research"
                        checked={interests.research}
                        onCheckedChange={(checked) => setInterests({ ...interests, research: checked as boolean })}
                      />
                      <label htmlFor="research" className="text-sm cursor-pointer">
                        <span className="font-semibold">Research Updates</span> - Latest findings, papers, and academic
                        collaborations
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="product"
                        checked={interests.product}
                        onCheckedChange={(checked) => setInterests({ ...interests, product: checked as boolean })}
                      />
                      <label htmlFor="product" className="text-sm cursor-pointer">
                        <span className="font-semibold">Product News</span> - New features, releases, and technical updates
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="consulting"
                        checked={interests.consulting}
                        onCheckedChange={(checked) => setInterests({ ...interests, consulting: checked as boolean })}
                      />
                      <label htmlFor="consulting" className="text-sm cursor-pointer">
                        <span className="font-semibold">Consulting Services</span> - Security insights, best practices, and
                        case studies
                      </label>
                    </div>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={submitted}>
                  {submitted ? (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-5 w-5" />
                      Subscribe to Newsletter
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  By subscribing, you agree to receive emails from AgentShield. You can unsubscribe at any time. We respect
                  your privacy.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
