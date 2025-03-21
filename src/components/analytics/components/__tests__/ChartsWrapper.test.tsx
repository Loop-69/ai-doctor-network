
import React from "react";
import { render, screen } from "@/utils/test-utils";
import ChartsWrapper from "../ChartsWrapper";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

const mockData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const mockConfig = {
  value: { color: "#8884d8", label: "Value" }
};

describe("ChartsWrapper", () => {
  it("renders title and description correctly", () => {
    render(
      <ChartsWrapper 
        title="Test Chart Title" 
        description="Test Chart Description"
        config={mockConfig}
      >
        <BarChart data={mockData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ChartsWrapper>
    );
    
    expect(screen.getByText("Test Chart Title")).toBeInTheDocument();
    expect(screen.getByText("Test Chart Description")).toBeInTheDocument();
  });
  
  it("renders without description", () => {
    render(
      <ChartsWrapper 
        title="Test Chart Title"
        config={mockConfig}
      >
        <BarChart data={mockData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ChartsWrapper>
    );
    
    expect(screen.getByText("Test Chart Title")).toBeInTheDocument();
    expect(screen.queryByText("Test Chart Description")).not.toBeInTheDocument();
  });
  
  it("applies custom height", () => {
    render(
      <ChartsWrapper 
        title="Test Chart Title"
        config={mockConfig}
        height={500}
      >
        <BarChart data={mockData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ChartsWrapper>
    );
    
    const container = screen.getByText("Test Chart Title").closest(".card")?.querySelector(".card-content > div");
    expect(container).toHaveStyle("height: 500px");
  });
});
