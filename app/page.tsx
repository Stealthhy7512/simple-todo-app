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
      <div className="flex h-screen w-screen overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex flex-1 flex-col">
          <div className="flex flex-col flex-1">
            <div className="flex items-center p-3 bg-white shrink-0 ml-2 gap-4">
              <SidebarTrigger className="-ml-1" />
              <h1 className="text-4xl font-extrabold">TASKS</h1>
            </div>
            <TasksList />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
