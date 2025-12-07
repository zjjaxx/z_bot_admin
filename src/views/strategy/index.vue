<template>
  <div class="strategy-container">
    <div class="strategy-header">
      <h2>策略列表</h2>
    </div>

    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>策略管理</span>
        </div>
      </template>

      <el-table
        v-loading="isPending"
        :data="strategyList"
        stripe
        style="width: 100%"
        empty-text="暂无策略数据"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column
          prop="strategy_name"
          label="策略名称"
          min-width="150"
        />
        <el-table-column
          prop="strategy_desc"
          label="策略简介"
          min-width="150"
        />
        <el-table-column label="风险系数" width="120">
          <template #default="scope">
            <el-tag type="danger" size="small">
              {{ risk_coefficient_format(scope.row.risk_coefficient) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="胜率" width="120">
          <template #default="scope">
            <span
              :class="
                scope.row.strategy_rate > 0 ? 'text-danger' : 'text-success'
              "
            >
              {{ ((scope.row.strategy_rate as number) * 100).toFixed(2) }}%
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="strategy_total_count"
          label="总次数"
          width="100"
        />
        <el-table-column
          prop="strategy_win_count"
          label="盈利次数"
          width="100"
        />
        <el-table-column
          prop="strategy_loss_count"
          label="亏损次数"
          width="100"
        />
        <el-table-column label="总盈利" width="120">
          <template #default="scope">
            <span
              :class="
                scope.row.strategy_total_profit > 0
                  ? 'text-danger'
                  : 'text-success'
              "
            >
              {{ scope.row.strategy_total_profit >= 0 ? "+" : ""
              }}{{ scope.row.strategy_total_profit.toFixed(2) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleView(scope.row)"
            >
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 错误提示 -->
    <el-alert
      v-if="isError"
      title="加载失败"
      type="error"
      description="策略列表加载失败，请稍后重试"
      show-icon
      :closable="false"
      class="error-alert"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { generateStrategyListQueryOptions } from "@/api/strategy";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

defineOptions({
  name: "Strategy"
});

const router = useRouter();

const { isPending, isError, data } = useQuery(
  generateStrategyListQueryOptions()
);

// 计算策略列表数据
const strategyList = computed(() => data.value?.data || []);
const risk_coefficient_format = (risk_coefficient: number) => {
  switch (risk_coefficient) {
    case 1:
      return "稳健";
    case 2:
      return "激进";
  }
};
// 查看策略详情
const handleView = (row: any) => {
  router.push({ name: "strategyDetail", params: { name: row.strategy_name } });
  // 这里可以跳转到策略详情页
};

// 编辑策略
const handleEdit = (row: any) => {
  ElMessage.info(`编辑策略: ${row.strategy_name}`);
  // 这里可以跳转到策略编辑页
};
</script>

<style scoped>
.strategy-container {
}

.strategy-header {
  margin-bottom: 10px;
}

.strategy-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.error-alert {
  margin-top: 20px;
}

.text-success {
  color: var(--el-color-success);
}

.text-danger {
  color: var(--el-color-danger);
}
</style>
