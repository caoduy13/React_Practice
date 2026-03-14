import { z } from "zod";

export const ritualSchema = z.object({
  name: z.string().trim().min(1, "Tên nghi lễ là bắt buộc"),
  dateLunar: z.string().trim().min(1, "Ngày âm lịch là bắt buộc"),
  dateSolar: z.string().trim().optional(),
  timeOfExecution: z.string().trim().optional(),
  difficultyLevel: z.enum(["dễ", "trung bình", "khó", "rất khó"]),
  description: z.string().trim().optional(),
  content: z.string().trim().optional(),
  reference: z.string().trim().optional(),
  isHot: z.boolean().optional(),
  ritualCategoryId: z.string().trim().optional(),
});

export type RitualFormData = z.infer<typeof ritualSchema>;
