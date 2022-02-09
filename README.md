# Server-Chan

Send things to Server-chan using javascript.

##
v4开始支持Server酱turbo版.如使用老版Serverchan请使用v3之前版本.

## 输入

### `sendkey`:
**必要** 用于推送消息的SCKEY，最佳实践是将这个值放置在仓库设置中的secrets变量里。

### `text`: 

 **必要** 标题  
        
### `desp`: 

 **可选** 正文

### `channel`:
 **可选** 动态指定推送频道,参阅https://sct.ftqq.com/sendkey

## 示例
```
name: "units-test"
on:
  push:
    branches:
      - master
      - 'releases/*'

jobs:
  # test action works running from the graph  
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Get date
      run: echo "::set-env name=REPORT_DATE::$(TZ=':Asia/Shanghai' date '+%Y-%m-%d %T')"
    - name: ServerChan Notify new stuffs to emon.
      uses: emon100/Action-Serverchan@v2
      if: steps.dataWork.outputs.changed == 'true'
      with:
        # sendkey
        sendkey: ${{ secrets.sendkey }} 
        # Message title
        text: ${{ env.REPORT_DATE }}
        # Message content
        desp: ok
        # channel
        chanel: '9|16'
```
