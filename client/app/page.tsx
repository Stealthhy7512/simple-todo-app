import AppSidebar from "@/app/ui/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import TasksList from '@/app/ui/tasks-list'

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-muted">
        <AppSidebar />
        <SidebarInset className="flex flex-1 flex-col bg-background">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            </div>
          </div>
          <TasksList />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

