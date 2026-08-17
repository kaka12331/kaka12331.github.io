---
title: "2024 电赛 H 题循迹小车"
description: "基于 MSPM0G3507 的循迹小车工程，包含 12 路灰度、编码器 PID、IMU 盲走与赛道状态序列。"
tags: ["MSPM0", "PID", "循迹", "竞赛作品"]
githubUrl: "https://github.com/kaka12331/2024-dian-sai-h-line-follower"
cover: "/project-car.png"
status: "已开源"
featured: true
---

## 项目概览

该项目对应 2024 年电子设计竞赛 H 题循迹小车，使用 MSPM0G3507 作为控制核心，围绕赛道识别、速度闭环与状态切换组织代码。

> 本页只做项目入口与结构摘要，不替代仓库说明。编译环境、引脚和调参值请以 GitHub 仓库为准。

## 关键模块

- **12 路灰度传感器**：提取赛道相对位置与特征状态。
- **编码器 PID**：维持左右轮目标速度，降低电机差异带来的偏航。
- **IMU 盲走**：在灰度信息不足的路段辅助保持运动方向。
- **状态序列**：按跑道阶段与八字段序列切换控制逻辑。

## 软件组织建议

竞赛工程容易在现场迭代中变得难以维护。将“感知、状态判断、控制输出”拆开，可以让定位问题更直接：

```c
void Control_Loop(void)
{
    Sensor_Update();
    Track_StateUpdate();
    Motion_ControllerRun();
    Motor_OutputApply();
}
```

## 调试重点

1. 先确认灰度原始值、阈值和安装方向正确。
2. 单独闭环左右轮速度，再加入方向环。
3. 用明确的进入、保持、退出条件管理特殊赛道状态。
4. 为关键状态保留 OLED 或串口观测量，避免只凭现象猜参数。
