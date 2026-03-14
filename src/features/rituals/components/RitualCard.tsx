import { Link } from "react-router-dom";

import type { Ritual } from "@/features/rituals/types";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

interface RitualCardProps {
  ritual: Ritual;
}

export function RitualCard({ ritual }: RitualCardProps) {
  return (
    <Card className="h-full justify-between">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="line-clamp-2 text-lg">{ritual.name}</CardTitle>
          {ritual.isHot ? <Badge variant="destructive">Nổi bật</Badge> : null}
        </div>
        <CardDescription>{ritual.dateLunar}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        {ritual.description ? (
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {ritual.description}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">Chưa có mô tả.</p>
        )}
        <Badge variant="secondary">{ritual.difficultyLevel}</Badge>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/rituals/${ritual.id}`}>Xem chi tiết</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
