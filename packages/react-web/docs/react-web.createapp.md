<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@elux/react-web](./react-web.md) &gt; [createApp](./react-web.createapp.md)

## createApp() function

创建应用(CSR)

<b>Signature:</b>

```typescript
export declare function createApp(moduleGetter: ModuleGetter, storeMiddlewares?: StoreMiddleware[], storeLogger?: StoreLogger): {
    render({ id, ssrKey, viewName }?: RenderOptions): Promise<void>;
};
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  moduleGetter | [ModuleGetter](./react-web.modulegetter.md) | 模块工厂 |
|  storeMiddlewares | [StoreMiddleware](./react-web.storemiddleware.md)<!-- -->\[\] | store中间件 |
|  storeLogger | [StoreLogger](./react-web.storelogger.md) | store日志记录器 |

<b>Returns:</b>

{ render({ id, ssrKey, viewName }?: [RenderOptions](./react-web.renderoptions.md)<!-- -->): Promise&lt;void&gt;; }

返回包含`render(...)`<!-- -->方法的下一步实例

## Remarks

应用唯一的创建入口，用于客户端渲染(CSR)，服务端渲染(SSR)请使用[createSSR(...)](./react-web.createssr.md)
