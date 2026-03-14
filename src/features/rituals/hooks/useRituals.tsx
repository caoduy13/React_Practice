import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useMemo } from "react";

import { QUERY_KEYS } from "@/shared/constants";
import {
  ritualService,
  ritualCategoryService,
} from "@/features/rituals/services";
import type {
  CreateRitualDto,
  UpdateRitualDto,
  RitualFilterParams,
} from "@/features/rituals/types";

/**
 * Hook lấy danh sách rituals với pagination và filters.
 * Đồng bộ filters với URL search params.
 */
export function useRituals() {
  const [searchParams] = useSearchParams();

  // Parse filters từ URL params
  const filters = useMemo<RitualFilterParams>(() => {
    // useMemo dùng để lưu giá trị khi search/ tính toán để tránh re-render
    //chỉ tính toán lại khi dependency thay đổi
    //useCallback dùng để lưu function khi search/ tính toán để tránh re-render
    return {
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 10,
      //set rỗng sẽ gọi API
      search: searchParams.get("search") || undefined,
      difficultyLevel: searchParams.get("difficultyLevel") || undefined,
      ritualCategoryId: searchParams.get("ritualCategoryId") || undefined,
    };
  }, [searchParams]);

  const query = useQuery({
    queryKey: [...QUERY_KEYS.RITUALS, filters],
    queryFn: () => ritualService.getAll(filters),
    placeholderData: (prev) => prev, // Keep previous data while fetching
  });

  return {
    rituals: query.data?.data ?? [],
    pagination: query.data?.meta,
    isLoading: query.isLoading,
    error: query.error,
  };
}

/**
 * Hook tạo ritual mới.
 * Sau khi thành công → invalidate cache + navigate về list.
 */
export function useCreateRitual() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRitualDto) => ritualService.create(data),
    onSuccess: () => {
      toast.success("Tạo nghi lễ thành công!");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RITUALS });
      navigate("/admin/rituals");
    },
  });
}

/**
 * Hook cập nhật ritual.
 * Sau khi thành công → invalidate cache (list + detail) + navigate về list.
 */
export function useUpdateRitual() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRitualDto }) =>
      ritualService.update(id, data),
    onSuccess: (_data, variables) => {
      toast.success("Cập nhật nghi lễ thành công!");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RITUALS });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.RITUAL_DETAIL(variables.id),
      });
      navigate("/admin/rituals");
    },
  });
}

/**
 * Hook xóa ritual (soft delete).
 * Sau khi thành công → invalidate cache.
 */
export function useDeleteRitual() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ritualService.remove(id),
    onSuccess: () => {
      toast.success("Xóa nghi lễ thành công!");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RITUALS });
    },
  });
}

/**
 * Hook lấy chi tiết 1 ritual.
 */
export function useRitualDetail(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.RITUAL_DETAIL(id),
    queryFn: () => ritualService.getById(id),
    enabled: !!id, // đây là biến để enable query khi có id
  });
}

/**
 * Hook lấy danh sách ritual categories cho dropdown.
 */
export function useRitualCategories() {
  return useQuery({
    queryKey: QUERY_KEYS.RITUAL_CATEGORIES,
    queryFn: () => ritualCategoryService.getSelectOptions(),
    staleTime: 10 * 60 * 1000, // Cache 10 minutes
  });
}
