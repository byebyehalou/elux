<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@elux/react-redux-web](./react-redux-web.md) &gt; [FacadeRoutes](./react-redux-web.facaderoutes.md)

## FacadeRoutes type

\*

<b>Signature:</b>

```typescript
export declare type FacadeRoutes<F extends Facade, R extends string> = {
    [K in Exclude<keyof F, R>]?: F[K]['routeParams'];
};
```
<b>References:</b> [Facade](./react-redux-web.facade.md)
