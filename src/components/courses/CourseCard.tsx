
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export interface CourseProps {
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    avatar?: string;
  };
  thumbnail?: string;
  progress?: number;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  students: number;
  isEnrolled?: boolean;
}

const CourseCard: React.FC<CourseProps> = ({
  id,
  title,
  description,
  instructor,
  thumbnail,
  progress,
  category,
  level,
  duration,
  students,
  isEnrolled = false,
}) => {
  // Get instructor initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card className="overflow-hidden hover-scale card-shadow-hover">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/10">
            <span className="text-2xl font-bold text-primary/40">{title.substring(0, 2).toUpperCase()}</span>
          </div>
        )}
        <Badge className="absolute top-2 right-2">{category}</Badge>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl line-clamp-1">{title}</CardTitle>
        </div>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={instructor.avatar} />
            <AvatarFallback>{getInitials(instructor.name)}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{instructor.name}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <Badge variant="outline" className="font-normal">
            {level}
          </Badge>
          <Badge variant="outline" className="font-normal">
            {duration}
          </Badge>
          <Badge variant="outline" className="font-normal">
            {students} students
          </Badge>
        </div>
        
        {isEnrolled && typeof progress === 'number' && (
          <div className="mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2">
        {isEnrolled ? (
          <Button className="w-full">Continue Learning</Button>
        ) : (
          <Button className="w-full">Enroll Now</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
