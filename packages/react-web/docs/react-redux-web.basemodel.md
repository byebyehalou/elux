<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@elux/react-redux-web](./react-redux-web.md) &gt; [BaseModel](./react-redux-web.basemodel.md)

## BaseModel class

\*

<b>Signature:</b>

```typescript
export declare abstract class BaseModel<MS extends ModuleState = {}, MP extends ModuleState = {}, RS extends RootState = {}> implements CommonModel 
```
<b>Implements:</b> [CommonModel](./react-redux-web.commonmodel.md)

## Constructors

|  Constructor | Modifiers | Description |
|  --- | --- | --- |
|  [(constructor)(moduleName, store)](./react-redux-web.basemodel._constructor_.md) |  | Constructs a new instance of the <code>BaseModel</code> class |

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [actions](./react-redux-web.basemodel.actions.md) |  | [ActionsThis](./react-redux-web.actionsthis.md)<!-- -->&lt;this&gt; |  |
|  [defaultRouteParams](./react-redux-web.basemodel.defaultrouteparams.md) |  | MP |  |
|  [moduleName](./react-redux-web.basemodel.modulename.md) |  | string |  |
|  [router](./react-redux-web.basemodel.router.md) |  | { routeState: [RouteState](./react-redux-web.routestate.md)<!-- -->; } |  |
|  [store](./react-redux-web.basemodel.store.md) |  | [UStore](./react-redux-web.ustore.md) |  |

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [destroy()](./react-redux-web.basemodel.destroy.md) |  |  |
|  [dispatch(action)](./react-redux-web.basemodel.dispatch.md) |  |  |
|  [getCurrentActionName()](./react-redux-web.basemodel.getcurrentactionname.md) |  |  |
|  [getCurrentRootState()](./react-redux-web.basemodel.getcurrentrootstate.md) |  |  |
|  [getCurrentState()](./react-redux-web.basemodel.getcurrentstate.md) |  |  |
|  [getLatestState()](./react-redux-web.basemodel.getlateststate.md) |  |  |
|  [getPrivateActions(actionsMap)](./react-redux-web.basemodel.getprivateactions.md) |  |  |
|  [getRootState()](./react-redux-web.basemodel.getrootstate.md) |  |  |
|  [getRouteParams()](./react-redux-web.basemodel.getrouteparams.md) |  |  |
|  [getState()](./react-redux-web.basemodel.getstate.md) |  |  |
|  [init(latestState, preState)](./react-redux-web.basemodel.init.md) |  |  |
|  [loadModel(moduleName)](./react-redux-web.basemodel.loadmodel.md) |  |  |
