---
title: "视觉伺服双轴云台控制系统"
description: "基于 STM32F103 与 K230 的实时目标跟踪方案，通过串口传递坐标并用双轴 PID 控制云台。"
tags: ["STM32", "K230", "PID", "竞赛作品"]
githubUrl: "https://github.com/kaka12331/2023-dian-sai-visual-gimbal"
cover: "/project-gimbal.png"
status: "已开源"
featured: true
---

## 项目概览

这是一个面向电子设计竞赛场景的视觉伺服双轴云台项目。K230 负责目标检测与坐标输出，STM32F103 解析串口数据，并使用 PID 调节两路舵机，让目标稳定保持在画面中心。

> 本页依据公开仓库整理。完整代码、通信协议与接线说明请以 GitHub 仓库中的 README 为准。

## 系统组成

| 模块 | 主要器件 | 作用 |
| --- | --- | --- |
| 主控 | STM32F103 | 串口解析、PID、PWM 与状态显示 |
| 视觉 | K230 | 图像采集、目标检测与坐标输出 |
| 执行 | 双轴舵机云台 | 完成水平、俯仰方向跟踪 |
| 显示 | OLED | 显示目标、误差和舵机状态 |

## 控制流程

1. K230 检测目标并通过串口发送坐标帧。
2. STM32 在中断中接收、校验并解析数据。
3. 计算目标位置与实际位置的像素误差。
4. 水平轴与俯仰轴分别运行 PID 调节。
5. 定时器输出 PWM，驱动舵机修正角度。

```c
error_x = target_x - actual_x;
error_y = target_y - actual_y;

pan_output  = PID_Calculate(&pid_pan,  target_x, actual_x);
tilt_output = PID_Calculate(&pid_tilt, target_y, actual_y);
```

## 适合继续扩展的方向

- 增加目标丢失后的扫描策略
- 加入滤波，降低坐标抖动对云台的影响
- 将常用阈值和 PID 参数保存到非易失存储器
- 增加上位机数据回传与实时调参
