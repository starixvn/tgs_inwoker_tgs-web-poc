# What is "usePageProps" used for？

## Introduction

`usePageProps` is a custom hook that aggregating all the props passed to `route` components in `Wap`.

## The challenge we are facing

In `Wap`, different props may be injected into components based on different route types:

```javascript
<Router history={AppHistory}>
  <Switch>
    {routes.map((route, index) => {
      // add correspond method via config
      let propsObj = {};
      if (route.alert === true) {
        propsObj["alert"] = this.handleOpenPopupAlert;
      }
      if (route.navigate === true) {
        propsObj["navigate"] = this.handleNavigate;
      }
      if (route.popup === true) {
        propsObj["popup"] = this.handleOpenPopup;
      }
      if (route.screenHeight === true) {
        propsObj["screenHeight"] = this.props.screenHeight;
      }
      propsObj["GetSupportUrl"] = this.getSupportUrl;
      propsObj["appHistory"] = AppHistory;
      propsObj["brandComm"] = this.props.getBrandCommunicationList;

      return (
        <Route
          exact
          key={index}
          path={route.path}
          render={(props) => {
            // add correspond property via path
            if (route.path === "/deposit/manual") {
              propsObj["order"] = props.location.state;
            }
            if (route.path === "/ip-restrict-mobile") {
              propsObj["ip"] =
                props.location.state != null
                  ? props.location.state.ip
                  : null;
            }
            if (route.path === "/promotion/:activityId?") {
              propsObj["promo"] =
                props.location.state != null
                  ? props.location.state.promo
                  : null;
            }
            if (route.path === "/deposit/details") {
              propsObj["order"] = props.location.state;
            }
            if (route.path === "/withdrawal/details") {
              propsObj["order"] =
                props.location.state != null
                  ? props.location.state.order
                  : null;
            }
            if (route.path === "/chat/:userid?/:name?/:question?") {
              propsObj["login"] =
                props.location.state != null
                  ? props.location.state.login
                  : null;
            }
            if (route.path === "/forgot-password/option") {
              propsObj["details"] =
                props.location.state != null
                  ? props.location.state.details
                  : null;
            }
            if (route.path === "/forgot-password/reset") {
              propsObj["forget_token"] =
                props.location.state != null
                  ? props.location.state.forget_token
                  : null;
            }
            if (route.path === "/card/name") {
              propsObj["from"] =
                props.location.state != null
                  ? props.location.state.from
                  : null;
            }
            return (
              <route.component
                {...propsObj}
                {...this.props.general}
              ></route.component>
            );
          }}
        />
      );
    })}
    <Redirect to="/"/>
  </Switch>
</Router>

```

However, in TypeScript, this approach can make it challenging for children component:


1. **Clearly understand which props are available to them**
2. **The types of those properties/methods are**
3. **[Most important] those "Route Components" can't be used outside `Wap` (because those props are not passed anymore)**

## Solution
If you closely examine those route components (such as Main, Deposit, Withdraw......etc.), you'll notice that their `this.props.OOXX` comes from:

1. **Their own state/methods.**
2. **Redux (from mapStateToProps and mapDispatchToProps).**
3. **Passed in from the parent component during router configuration.**

We don't need to worry about 1 and 2, but if today we need to modify the route structure and use those old components elsewhere, we must **re-pass the props** mentioned in 3.

That's where `usePageProps` comes into play. It's a custom hook designed to consolidate **all the props that will be
passed to children components** within `Wap`.

In other words, it collects and organizes these props in one
place:

```javascript
export function usePageProps() {
  // general
  const { alert } = useNotifications();
  const { navigate } = useNavigate();
  const { getSupportUrl } = useGetSupportUrl();
  const { ui } = useUiStore();
  const history = useHistory();
  const { getBrandCommunication } = useGeneralStore();
  const location = useLocation();

  // TODO: complete popup
  const popup = useCallback(() => {
    console.log("this.handleOpenPopup");
  }, []);

  // specific to routePath
  // if (route.path === "/ip-restrict-mobile")
  const ip = location.state?.ip || null;

  // if (route.path === "/promotion/:activityId?")
  const promo = location.state?.promo || null;

  // if (route.path === "/deposit/details")
  // if (route.path === "/withdrawal/details")
  const order = location.state?.order || null;

  // if (route.path === "/chat/:userid?/:name?/:question?")
  const login = location.state?.login || null;

  // if (route.path === "/forgot-password/option")
  const details = location.state?.details || null;

  // if (route.path === "/forgot-password/reset")
  const forget_token = location.state?.forget_token || null;

  // if (route.path === "/card/name")
  const from = location.state?.from || null;

  return {
    // general
    alert,
    navigate,
    popup,
    screenWidth: ui.screenWidth,
    screenHeight: ui.screenHeight,
    getSupportUrl,
    appHistory: history,
    brandComm: getBrandCommunication,
    // specific to routePath
    ip,
    promo,
    order,
    login,
    details,
    forget_token,
    from,
  };
}

```

Each prop/method within `usePageProps` is "type-protected," ensuring type-checking support
when using these props/methods within your TypeScript files (tsx).

## Example:
Let's consider a scenario where we have a `<Deposit/>` component that contains a legacy component `<DepositPrev/>`. The legacy component uses `this.props.OOXX` extensively:

```typescript jsx
const Deposit = (props: Props) => {
  return (
    <DepositContainer>
      <DepositPrev /> // this is a comonent contains lots of stuff we can't refactor
    </DepositContainer>
  );
};

export default Deposit;
```


`<DepositPrev/>` is a `class component` that contain complicate deposit logic. we can see lots of `this.props.OOXX` in
it:

```typescript jsx
// Example within DepositPrev class component
if (preProps.wallet.depositUploadResult !== this.props.wallet.depositUploadResult && this.props.wallet.depositUploadResult !== null) {
  if (this.props.wallet.depositUploadResult.IsSuccess) {
    this.props.alert("", i18n.t("deposit.uploadSuccess"));
  } else {
    this.props.alert("", this.props.wallet.depositUploadResult.info);
    this.props.appHistory.push("/main");
  }
}
//...
```
`this.props.wallet` comes from Redux, which we don't need to worry about. However, `this.props.alert` and `this.props.appHistory` are derived from props passed down from the parent component.

If we want to make `<DepositPrev/>` function successfully, we need to manually pass in methods or properties. The
simplest way to do this is by using our `usePageProps`.

```typescript jsx
const Deposit = (props: Props) => {
  const { appHistory, alert } = usePageProps(); // contains all the props the prev class component needed
  return (
    <DepositContainer> 
      <DepositPrev appHistory={appHistory} alert={alert} /> // pass them into children
    </DepositContainer>
  );
};
```
That's it! now you can see `<DepositPrev/>` is succeed rendered.!


## Note
* It's not recommended to use `usePageProps` directly in every page as shown in the example. Instead, consider it as a reference for understanding **how to replace or adapt parent-provided props** when refactoring different pages.
* If you can refactor `<DepositPrev>` as a functional component, you may not need to pass these props; you can invoke them directly within `<DepositPrev/>`.

For example:
```typescript jsx
const Deposit = (props: Props) => {
  // const { appHistory, alert } = usePageProps();
  // appHistory is came from: history = useHistory()
  // alert is came from: const { alert } = useNotifications();
  
  // so invoke them directly
  const history = useHistory(); 
  const { alert } = useNotifications();
  return (
    <DepositContainer>
      <DepositPrev appHistory={history} alert={alert} />
    </DepositContainer>
  );
};
```



## Conclusion
This approach ensures a clearer understanding of how to handle props in various page contexts when developing or refactoring from the Wap component.