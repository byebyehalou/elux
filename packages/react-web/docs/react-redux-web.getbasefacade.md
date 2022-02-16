<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@elux/react-redux-web](./react-redux-web.md) &gt; [GetBaseFacade](./react-redux-web.getbasefacade.md)

## GetBaseFacade type

\*

<b>Signature:</b>

```typescript
export declare type GetBaseFacade<F extends Facade, LoadComponentOptions, R extends string> = {
    State: FacadeStates<F, R>;
    GetActions<N extends Exclude<keyof F, R>>(...args: N[]): {
        [K in N]: F[K]['actions'];
    };
    LoadComponent: LoadComponent<F, LoadComponentOptions>;
    Modules: FacadeModules<F, R>;
    Actions: FacadeActions<F, R>;
};
```
<b>References:</b> [Facade](./react-redux-web.facade.md)<!-- -->, [FacadeStates](./react-redux-web.facadestates.md)<!-- -->, [LoadComponent](./react-redux-web.loadcomponent.md)<!-- -->, [FacadeModules](./react-redux-web.facademodules.md)<!-- -->, [FacadeActions](./react-redux-web.facadeactions.md)
