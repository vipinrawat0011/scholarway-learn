
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GraduationCap, Send, Sparkles, Clock, BookOpen, FileText, X, Maximize, Minimize, Zap } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your ScholarWay AI learning assistant. How can I help you with your studies today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponses = [
        "Based on your query, I'd recommend focusing on the core concepts of differential equations first. Start with understanding the basic definitions and types before moving to solution methods.",
        "Let me help you with that calculus problem. When solving integrals by substitution, remember to change the bounds of integration when using definite integrals. Would you like me to show you an example?",
        "For your physics question about projectile motion, remember that the horizontal and vertical components can be analyzed separately. The key equation you'll need is v = u + at for the velocity.",
        "I've analyzed your study patterns and noticed you perform best with spaced repetition. I recommend dividing your Chemistry revision into 25-minute sessions with 5-minute breaks in between.",
        "The topic you're asking about is covered in Chapter 4 of your textbook. I've also found some supplementary resources that explain the concept in a different way, which might help your understanding.",
        "When preparing for your upcoming exam, focus on these key areas: polynomial functions, differentiation rules, and application problems. These made up 70% of last year's exam.",
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className={`fixed bottom-4 right-4 w-80 shadow-lg transition-all duration-300 z-50 ${
      isExpanded ? 'h-[500px] w-[400px]' : 'h-[450px]'
    }`}>
      <CardHeader className="p-3 flex flex-row items-center justify-between bg-primary/5 rounded-t-lg">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>
              <GraduationCap className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-sm">ScholarWay AI</CardTitle>
            <div className="flex items-center mt-0.5">
              <Badge variant="outline" className="h-5 text-[10px] px-1 border-green-500 text-green-600 flex items-center">
                <span className="block h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></span>
                Online
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex">
          {isExpanded ? (
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsExpanded(false)}>
              <Minimize className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsExpanded(true)}>
              <Maximize className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 h-[336px]">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                } p-3 rounded-lg`}>
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>
                          <GraduationCap className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium">ScholarWay AI</span>
                      <Sparkles className="h-3 w-3 text-primary" />
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <div className={`text-xs mt-1 ${
                    message.role === 'user' 
                      ? 'text-primary-foreground/80' 
                      : 'text-muted-foreground'
                  }`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[85%] bg-muted p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Typing</span>
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      
      <CardFooter className="p-3 border-t pt-3">
        <div className="grid grid-cols-1 gap-2 w-full">
          {isExpanded && (
            <div className="flex gap-1.5">
              <Button variant="outline" size="sm" className="h-8 text-xs flex-1">
                <BookOpen className="h-3 w-3 mr-1" />
                Study Tips
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs flex-1">
                <Clock className="h-3 w-3 mr-1" />
                Schedule Help
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs flex-1">
                <FileText className="h-3 w-3 mr-1" />
                Explain Topic
              </Button>
            </div>
          )}
          <div className="flex gap-2">
            <Input
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-9"
            />
            <Button size="sm" className="h-9 px-3" onClick={handleSend} disabled={!input.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
            <Zap className="h-3 w-3" />
            Powered by advanced educational AI
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIAssistant;
