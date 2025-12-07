<script setup lang="ts">
import { getBlockList } from "@/api/block";
import { useQuery } from "@tanstack/vue-query";
import { Refresh, Document } from "@element-plus/icons-vue";
import type { Datum } from "@/api/block";

const {
  isPending,
  isError,
  data,
  refetch: refreshData
} = useQuery({
  queryKey: ["block"],
  queryFn: getBlockList
});

// 处理刷新
const handleRefresh = () => {
  refreshData();
};

// 格式化百分比
const formatPercent = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

// 获取标签类型（红涨绿跌）
const getTagType = (value: number): "danger" | "success" | "info" => {
  if (value > 0) return "danger"; // 上涨用红色
  if (value < 0) return "success"; // 下跌用绿色
  return "info";
};

// 获取涨跌对应的样式类
const getPriceClass = (value: number): string => {
  if (value > 0) return "text-danger"; // 上涨红色
  if (value < 0) return "text-success"; // 下跌绿色
  return "text-gray-500"; // 平盘灰色
};
</script>

<template>
  <div v-loading="isPending" class="h-full bg-gray-50 p-4">
    <div class="mb-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">股票板块分析</h1>
      <el-button type="primary" :loading="isPending" @click="handleRefresh">
        <el-icon><Refresh /></el-icon>
        刷新数据
      </el-button>
    </div>

    <!-- 错误提示 -->
    <el-alert
      v-if="isError"
      type="error"
      title="数据加载失败"
      description="点击刷新按钮重新加载数据"
      show-icon
      class="mb-4"
    />

    <!-- 股票板块卡片 -->
    <div
      v-if="data?.data && data.data.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <el-card
        v-for="item in data.data"
        :key="item.block"
        class="shadow-md hover:shadow-lg transition-all duration-300"
      >
        <template #header>
          <div class="flex justify-between items-center">
            <span class="text-lg font-semibold">{{ item.block }}</span>
            <el-tag :type="getTagType(item.block_rate || 0)">
              {{ formatPercent(item.block_rate || 0) }}
            </el-tag>
          </div>
        </template>

        <!-- 其余信息2列布局 -->
        <div class="grid grid-cols-2 gap-4">
          <div class="stat-item">
            <div class="stat-title">资金流入（亿）</div>
            <div
              class="stat-value"
              :class="item.input > 0 ? 'text-danger' : 'text-success'"
            >
              {{ (item.input || 0).toFixed(2) }}亿
            </div>
          </div>

          <div class="stat-item">
            <div class="stat-title">领涨股</div>
            <div class="stat-value">{{ item.codeName || "-" }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-title">涨幅</div>
            <div class="stat-value" :class="getPriceClass(item.pnl_rate || 0)">
              {{ formatPercent(item.pnl_rate || 0) }}
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-title">当前价格</div>
            <div class="stat-value font-mono">
              {{ (item.price || 0).toFixed(2) }}
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 空状态 -->
    <el-empty
      v-else-if="!isPending && !isError"
      description="暂无股票板块数据"
      class="py-10"
    >
      <template #image>
        <el-icon class="el-icon--large text-gray-300"><Document /></el-icon>
      </template>
    </el-empty>
  </div>
</template>

<style scoped>
/* 自定义样式增强视觉效果 */
.el-card {
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.el-card__header {
  padding: 16px 20px;
  background-color: #f8fafc;
}

.el-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.el-tag--danger {
  background-color: #fee;
  border-color: #fcc;
  color: #f56c6c;
}

.el-tag--success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #67c23a;
}

.stat-item {
  margin-bottom: 12px;
}

.stat-title {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 16px;
  font-weight: 600;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
}

.text-danger {
  color: #f56c6c !important;
}

.text-success {
  color: #67c23a !important;
}

.text-gray-500 {
  color: #909399 !important;
}
</style>
