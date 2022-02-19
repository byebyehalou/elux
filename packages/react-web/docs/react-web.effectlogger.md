<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@elux/react-web](./react-web.md) &gt; [effectLogger](./react-web.effectlogger.md)

## effectLogger() function

\*

<b>Signature:</b>

```typescript
export declare function effectLogger(before: (action: Action, promiseResult: Promise<any>) => void, after: null | ((status: 'Rejected' | 'Resolved', beforeResult: any, effectResult: any) => void)): (target: any, key: string, descriptor: PropertyDescriptor) => void;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  before | (action: [Action](./react-web.action.md)<!-- -->, promiseResult: Promise&lt;any&gt;) =&gt; void |  |
|  after | null \| ((status: 'Rejected' \| 'Resolved', beforeResult: any, effectResult: any) =&gt; void) |  |

<b>Returns:</b>

(target: any, key: string, descriptor: PropertyDescriptor) =&gt; void
