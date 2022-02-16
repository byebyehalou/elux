<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@elux/react-redux-web](./react-redux-web.md) &gt; [exportModule](./react-redux-web.exportmodule.md)

## exportModule() function

\*

<b>Signature:</b>

```typescript
export declare function exportModule<N extends string, H extends CommonModel, C extends {
    [componentName: string]: EluxComponent | AsyncEluxComponent;
}, D>(moduleName: N, ModelClass: CommonModelClass<H>, components: C, data?: D): {
    moduleName: N;
    initModel: (store: UStore) => void | Promise<void>;
    state: ReturnType<H['init']>;
    routeParams: H['defaultRouteParams'];
    actions: PickActions<H>;
    components: C;
    data: D;
};
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  moduleName | N |  |
|  ModelClass | [CommonModelClass](./react-redux-web.commonmodelclass.md)<!-- -->&lt;H&gt; |  |
|  components | C |  |
|  data | D |  |

<b>Returns:</b>

{ moduleName: N; initModel: (store: [UStore](./react-redux-web.ustore.md)<!-- -->) =&gt; void \| Promise&lt;void&gt;; state: ReturnType&lt;H\['init'\]&gt;; routeParams: H\['defaultRouteParams'\]; actions: [PickActions](./react-redux-web.pickactions.md)<!-- -->&lt;H&gt;; components: C; data: D; }
