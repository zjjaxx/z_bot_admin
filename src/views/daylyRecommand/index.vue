<template>
  <div class="strategy-container">
    <div class="strategy-header">
      <h2>每日推荐列表</h2>
    </div>

    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>每日推荐管理</span>
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
        <el-table-column prop="stock_id" label="股票代码" min-width="120" />
        <el-table-column prop="strateOperate" label="操作内容" min-width="120">
          <template #default="scope">
            <span v-if="scope.row.strateOperate === 1">
              <el-tag type="danger">购买</el-tag>
            </span>
            <span v-else-if="scope.row.strateOperate === 2">
              <el-tag type="success">卖出</el-tag>
            </span>
            <span v-else>
              {{ scope.row.strateOperate }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="strateName" label="策略名称" min-width="120" />
        <el-table-column
          prop="strateBackTestRate"
          label="策略胜率"
          min-width="120"
        >
          <template #default="scope">
            {{ (parseFloat(scope.row.strateBackTestRate) * 100).toFixed(2) }}%
          </template>
        </el-table-column>
        <el-table-column
          prop="strateWinCount"
          label="盈利次数"
          min-width="120"
        />
        <el-table-column
          prop="strateLossCount"
          label="亏损次数"
          min-width="120"
        />
        <el-table-column prop="updated" label="时间" min-width="120">
          <template #default="scope">
            {{ formatDate(new Date(scope.row.updated), "yyyy-MM-dd") }}
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
import { formatDate } from "@/utils/date";
import { generateDaylyRecommandQueryOptions } from "@/api/dayly";

defineOptions({
  name: "DaylyRecommand"
});

const { isPending, isError, data } = useQuery(
  generateDaylyRecommandQueryOptions()
);

// 计算策略列表数据
const strategyList = computed(() => data.value?.data || []);
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
