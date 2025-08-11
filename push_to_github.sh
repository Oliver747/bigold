#!/bin/bash
# 自动推送脚本

# 设置提交信息（如果没传参数，默认使用 "Update"）
commit_message=${1:-"Update"}

# 添加所有改动
git add .

# 提交
git commit -m "$commit_message"

# 推送到 main 分支
git push origin main


