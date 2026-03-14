import { createBaseService } from "@/shared/services/BaseService";

import { API_ENDPOINTS } from "@/shared/constants";
import type {
  Ritual,
  CreateRitualDto,
  UpdateRitualDto,
  RitualFilterParams,
  RitualCategory,
} from "@/features/rituals/types";
import type { BaseFilterParams } from "@/shared/types";
import apiClient from "@/lib/axios";

/**
 * Ritual Service - CRUD operations cho rituals.
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * ⚠️ GIẢI THÍCH: TẠI SAO CHỈ OVERRIDE `remove`?
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * BaseService đã có sẵn TẤT CẢ CRUD methods:
 * - getAll(), getById(), create(), update(), remove(), getSelectOptions()
 *
 * ✅ CẦN OVERRIDE khi:
 * 1. **BUSINESS LOGIC KHÁC** với default behavior
 *    VD: Ritual dùng SOFT DELETE (patch /soft-remove)
 *        thay vì HARD DELETE (delete /)
 *
 * 2. **ENDPOINT KHÁC** với pattern mặc định
 *    VD: getAll cần gọi /ritual/search thay vì /ritual
 *
 * 3. **EXTRA LOGIC** như logging, caching, validation
 *
 * ❌ KHÔNG CẦN OVERRIDE khi:
 * - Return type GIỐNG với BaseService generics
 *   VD: RitualListResponse = PaginatedResponse<Ritual> (alias)
 *       RitualSelectOption = SelectOption (alias)
 *   → BaseService generics đã cover!
 *
 * - Endpoint theo pattern chuẩn: /resource, /resource/:id, /resource/select
 *
 * 📚 Nguyên tắc: Override chỉ khi CÓ LÝ DO rõ ràng, không override "just in case"
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export const ritualService = createBaseService<
  Ritual,
  CreateRitualDto,
  UpdateRitualDto,
  RitualFilterParams
>({
  endpoint: API_ENDPOINTS.RITUAL.BASE,

  /**
   * Override `remove` method vì Ritual dùng SOFT DELETE.
   *
   * Default behavior: DELETE /ritual/:id (hard delete)
   * Ritual behavior: PATCH /ritual/:id/soft-remove (soft delete)
   *
   * Lý do soft delete:
   * - Không xoá data vĩnh viễn khỏi database
   * - Chỉ đánh dấu isDeleted = true
   * - Có thể restore sau này
   * - Giữ lại data cho audit/reporting
   */
  remove: async (id) => {
    await apiClient.patch(`${API_ENDPOINTS.RITUAL.BASE}/${id}/soft-remove`);
  },
});

/**
 * Ritual Category Service - Đơn giản, không cần override.
 *
 * BaseService đã cung cấp đủ functionality:
 * - getAll() → GET /ritual-category (với pagination)
 * - getById() → GET /ritual-category/:id
 * - getSelectOptions() → GET /ritual-category/select
 * - create(), update(), remove() → Standard CRUD
 *
 * Generic types:
 * - TEntity = RitualCategory
 * - TCreateDto = unknown (không dùng create trong app này)
 * - TUpdateDto = unknown (không dùng update trong app này)
 * - TFilterParams = BaseFilterParams (chỉ cần page, limit, search)
 *
 * ⚠️ `unknown` được dùng khi method KHÔNG ĐƯỢC SỬ DỤNG trong app.
 * Nếu gọi create/update sẽ lỗi TypeScript → An toàn hơn `any` hoặc `never`.
 */
export const ritualCategoryService = createBaseService<
  RitualCategory,
  unknown,
  unknown,
  BaseFilterParams
>({
  endpoint: API_ENDPOINTS.RITUAL_CATEGORY.BASE,
});
