
import React, { ReactNode, ReactElement } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

interface ChartsWrapperProps {
  title: string;
  description?: string;
  children: ReactNode;
  height?: number;
  config: Record<string, any>;
}

const ChartsWrapper = ({ 
  title, 
  description, 
  children, 
  height = 400,
  config
}: ChartsWrapperProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ height: `${height}px` }}>
          <ChartContainer config={config} className="h-full">
            {children as ReactElement}
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartsWrapper;
