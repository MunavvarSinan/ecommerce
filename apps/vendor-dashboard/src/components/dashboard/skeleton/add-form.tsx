import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@repo/ui/components/ui/card";
import { Skeleton } from "@repo/ui/components/ui/skeleton";

export function AddFormLoading(): JSX.Element {
  return (
    <div className="w-full space-y-3 overflow-auto">
      <div className="flex w-full items-center justify-between space-x-2 overflow-auto p-1">
        <div className="flex flex-1 items-center space-x-2">
          <Skeleton className="h-7 w-[150px] lg:w-[250px]" />
        </div>
      </div>
      <Card>
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-4 w-2/4" />
        </CardHeader>
        <CardContent>
          <div className="grid w-full max-w-xl gap-4">
            <div className="space-y-2.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6" />
            </div>
            <div className="space-y-2.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-20" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-32" />
        </CardFooter>
      </Card>
    </div>
  );
}
