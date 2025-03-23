
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { GraduationCap, BookOpen, Users, CheckCircle, BarChart, Sparkles, ArrowRight } from 'lucide-react';
import AIAssistant from '@/components/ai/AIAssistant';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary/5 py-24 sm:py-32">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-center opacity-5"></div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl animate-slide-in-up">
                Empower Your Educational Journey
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
                ScholarWay is an intuitive learning management system designed for schools and colleges, providing seamless educational experiences for students, teachers, and administrators.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
                <Button size="lg" asChild>
                  <Link to="/login">Get Started</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/login?register=true">Sign Up</Link>
                </Button>
              </div>
            </div>
            
            <div className="mt-16 flow-root sm:mt-20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative rounded-xl bg-white/70 backdrop-blur p-8 shadow-lg dark:bg-gray-900/70 ring-1 ring-gray-900/5">
                <div className="flex flex-wrap justify-center gap-5 sm:gap-8">
                  <div className="flex flex-col items-center">
                    <BookOpen className="h-10 w-10 text-primary" />
                    <p className="mt-2 text-xl font-semibold">Courses</p>
                    <p className="text-sm text-muted-foreground">Diverse Learning</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Users className="h-10 w-10 text-primary" />
                    <p className="mt-2 text-xl font-semibold">Community</p>
                    <p className="text-sm text-muted-foreground">Collaborative Growth</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <BarChart className="h-10 w-10 text-primary" />
                    <p className="mt-2 text-xl font-semibold">Progress</p>
                    <p className="text-sm text-muted-foreground">Track Achievement</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Sparkles className="h-10 w-10 text-primary" />
                    <p className="mt-2 text-xl font-semibold">AI Assistance</p>
                    <p className="text-sm text-muted-foreground">Smart Learning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Designed for Modern Education</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Our comprehensive learning management system provides all the tools needed for effective teaching and learning in today's digital age.
              </p>
            </div>
            
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col hover-scale">
                  <dt className="flex items-center gap-x-3 text-xl font-semibold">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10">
                      <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    Rich Learning Content
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">
                      Access a diverse range of study materials, interactive lessons, and assessments for comprehensive learning experiences.
                    </p>
                    <p className="mt-6">
                      <Link to="/login" className="text-sm font-semibold text-primary flex items-center">
                        Explore content <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </p>
                  </dd>
                </div>
                
                <div className="flex flex-col hover-scale">
                  <dt className="flex items-center gap-x-3 text-xl font-semibold">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10">
                      <Users className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    Personalized Learning Paths
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">
                      Tailored educational journeys based on student abilities, progress, and learning styles to maximize potential.
                    </p>
                    <p className="mt-6">
                      <Link to="/login" className="text-sm font-semibold text-primary flex items-center">
                        Discover learning paths <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </p>
                  </dd>
                </div>
                
                <div className="flex flex-col hover-scale">
                  <dt className="flex items-center gap-x-3 text-xl font-semibold">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10">
                      <BarChart className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    Comprehensive Analytics
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">
                      Track student progress, identify strengths and areas for improvement with detailed performance metrics and insights.
                    </p>
                    <p className="mt-6">
                      <Link to="/login" className="text-sm font-semibold text-primary flex items-center">
                        View analytics <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
        
        {/* Tiers Section */}
        <section className="bg-primary/5 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Scholar Tiers</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Our unique student classification system rewards achievement and motivates continued growth.
              </p>
            </div>
            
            <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-6 sm:mt-20 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5 hover:shadow-xl transition-shadow duration-300">
                <div className="flex-1 bg-white p-6 sm:p-8">
                  <div className="flex items-center gap-x-4">
                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-scholar-junior/10">
                      <GraduationCap className="h-6 w-6 text-scholar-junior" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold leading-8">Junior Scholar</h3>
                  </div>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    The beginning of the educational journey. Junior Scholars are establishing their foundational knowledge and developing core skills.
                  </p>
                  <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-5 w-5 flex-none text-green-500" aria-hidden="true" />
                      Access to core curriculum
                    </li>
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-5 w-5 flex-none text-green-500" aria-hidden="true" />
                      Basic progress tracking
                    </li>
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-5 w-5 flex-none text-green-500" aria-hidden="true" />
                      Foundational study materials
                    </li>
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-5 w-5 flex-none text-green-500" aria-hidden="true" />
                      AI learning assistant (basic)
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5 hover:shadow-xl transition-shadow duration-300">
                <div className="flex-1 bg-white p-6 sm:p-8">
                  <div className="flex items-center gap-x-4">
                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-scholar-rising/10">
                      <GraduationCap className="h-6 w-6 text-scholar-rising" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold leading-8">Rising Intellect</h3>
                  </div>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    Students who have demonstrated academic progress and commitment to learning. Rising Intellects are expanding their knowledge.
                  </p>
                  <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-5 w-5 flex-none text-green-500" aria-hidden="true" />
                      All Junior Scholar benefits
                    </li>
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-5 w-5 flex-none text-green-500" aria-hidden="true" />
                      Advanced course materials
                    </li>
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-5 w-5 flex-none text-green-500" aria-hidden="true" />
                      Personalized learning recommendations
                    </li>
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-5 w-5 flex-none text-green-500" aria-hidden="true" />
                      Enhanced AI learning support
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5 hover:shadow-xl transition-shadow duration-300">
                <div className="flex-1 bg-white p-6 sm:p-8">
                  <div className="flex items-center gap-x-4">
                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-scholar-elite/10">
                      <GraduationCap className="h-6 w-6 text-scholar-elite" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold leading-8">Mastermind Elite</h3>
                  </div>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    The highest tier, recognizing exceptional academic achievement and intellectual growth. Masterminds exemplify excellence.
                  </p>
                  <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-5 w-5 flex-none text-green-500" aria-hidden="true" />
                      All Rising Intellect benefits
                    </li>
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-5 w-5 flex-none text-green-500" aria-hidden="true" />
                      Exclusive advanced courses
                    </li>
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-5 w-5 flex-none text-green-500" aria-hidden="true" />
                      Mentorship opportunities
                    </li>
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-5 w-5 flex-none text-green-500" aria-hidden="true" />
                      Premium AI tutoring features
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to transform your educational experience?</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Join ScholarWay today and embark on a journey of personalized learning, growth, and achievement.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button size="lg" asChild>
                  <Link to="/login">Get Started</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Index;
