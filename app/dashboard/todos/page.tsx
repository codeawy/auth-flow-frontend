"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ClipboardCheck,
  ListTodo,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { PageContainer } from "@/components/ui/page-container";
import { useAuthStore } from "@/state/auth-store";

export default function TodosPage() {
  const { isLoading } = useAuthStore((state) => state);

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
            <p className="text-muted-foreground">Loading your tasks...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        {/* Header with breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link
              href="/dashboard"
              className="flex items-center hover:text-primary transition-colors"
            >
              <LayoutDashboard className="h-3.5 w-3.5 mr-1" />
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Tasks</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <ClipboardCheck className="h-7 w-7" />
                Task Management
              </h1>
              <p className="text-muted-foreground mt-1">
                Create, manage, and track all your tasks in one place
              </p>
            </div>

            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>

        {/* Main content */}
        <Card className="mb-8 overflow-hidden border-primary/10 pt-0">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent relative py-8 overflow-hidden">
            <div
              className="absolute inset-0 opacity-40"
              style={{ height: "120%", top: "-10%" }}
            >
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <pattern
                  id="profilePattern"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="10" cy="10" r="1" fill="currentColor" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#profilePattern)" />
              </svg>
            </div>
            <CardTitle className="text-xl flex items-center gap-2">
              <ListTodo className="h-5 w-5" />
              Add New Task
            </CardTitle>
            <CardDescription>
              Create a new task with title, description, priority, and due date
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <h3>Create Todo</h3>
          </CardContent>
        </Card>

        {/* Todo list */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">My Tasks</CardTitle>
            <CardDescription>View and manage all your tasks</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <h3>Todo List here...</h3>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
