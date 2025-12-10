<template>
  <div class="strategy-detail-container">
    <!-- 页面标题 -->
    <div class="strategy-detail-header">
      <h2>订单详情</h2>
    </div>

    <!-- 策略基本信息卡片 -->
    <el-card shadow="hover" class="strategy-info-card">
      <template #header>
        <div class="card-header">
          <span>策略信息</span>
        </div>
      </template>

      <div class="strategy-info-content">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="策略名称">
            <span class="strategy-name">{{ strategyName }}</span>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>

    <!-- 股票代码列表 -->
    <el-card shadow="hover" class="stock-symbols-card">
      <template #header>
        <div class="card-header">
          <span>订单列表</span>
        </div>
      </template>

      <el-table
        v-loading="isPending"
        :data="orderListWithIndex"
        stripe
        style="width: 100%"
        empty-text="暂无股票代码数据"
        border
      >
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column prop="type" label="订单类型" min-width="120">
          <template #default="scope">
            <el-tag v-if="scope.row.type === 'buy'" type="success">
              {{ scope.row.type }}
            </el-tag>
            <el-tag v-else type="danger">
              {{ scope.row.type }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="symbol" label="股票代码" min-width="120" />
        <el-table-column prop="date" label="订单日期" min-width="120" />
        <el-table-column prop="shares" label="订单数量" min-width="120" />
        <el-table-column prop="fill_price" label="订单价格" min-width="120" />
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-if="orderList.length > 0"
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="orderList.length"
        />
      </div>
    </el-card>

    <!-- 错误提示 -->
    <el-alert
      v-if="isError"
      title="加载失败"
      type="error"
      description="策略详情加载失败，请稍后重试"
      show-icon
      :closable="false"
      class="error-alert"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { generateOrderDetailListQueryOptions } from "@/api/order";
import { generateTradeListQueryOptions } from "@/api/trade";
import { useRoute } from "vue-router";

defineOptions({
  name: "OrderDetail"
});

const route = useRoute();
const strategyName = route.params.name as string;
const id = route.params.id as string;

// 分页参数
const currentPage = ref(1);
const pageSize = ref(20);

const { isPending, isError, data } = useQuery(
  generateOrderDetailListQueryOptions(strategyName, id)
);

// 订单列表
const orderList = computed(() => data.value?.data || []);

// 添加序号的订单列表（用于分页）
const orderListWithIndex = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return orderList.value.slice(start, end).map(order => ({
    ...order
  }));
});
</script>

<style scoped>
.strategy-detail-container {
}

.strategy-detail-header {
  margin-bottom: 20px;
}

.strategy-detail-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.strategy-info-card {
  margin-bottom: 20px;
}

.stock-symbols-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.strategy-info-content {
  padding: 10px 0;
}

.strategy-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--el-color-primary);
}

.copy-icon {
  margin-left: 4px;
  font-size: 12px;
  opacity: 0.7;
}

:deep(.el-tag:hover .copy-icon) {
  opacity: 1;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.error-alert {
  margin-top: 20px;
}
</style>
