<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@elux/react-redux-web](./react-redux-web.md) &gt; [InferableComponentEnhancerWithProps](./react-redux-web.inferablecomponentenhancerwithprops.md)

## InferableComponentEnhancerWithProps type


<b>Signature:</b>

```typescript
export declare type InferableComponentEnhancerWithProps<TInjectedProps> = <C>(component: C) => EluxComponent & ComponentType<Omit<GetProps<C>, keyof TInjectedProps>>;
```
<b>References:</b> [EluxComponent](./react-redux-web.eluxcomponent.md)<!-- -->, [GetProps](./react-redux-web.getprops.md)
