# HOW TO MIGRATE THE USAGE FROM PREVIOUS REDUX?

## Introduction
In this repository, we can see many components at the bottom using `connect`, `mapStateToProps`, and `mapDispatchToProps`:
```
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Wap));

const mapStateToProps = (state) => {
  return {
    account: state.account,
    general: state.general,
    game: state.game,
    ui: state.ui,
    wallet: state.wallet,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMobilePrefix: () => dispatch(generalAction.getMobilePrefix()),
    getMarquee: (language) => dispatch(uiAction.getMarquee(language)),
    getAnnouncement: (language) => dispatch(uiAction.getAnnouncement(language)),
    getBanner: () => {
      dispatch(generalAction.getBanner());
    },
  };
};
```

This way, we can access the state from those stores and actions through `props`:
```
// ex: get account from this.props.account
 if (this.props.account.token == null) {
    // ...
 }
 
// ex: invoke getMobilePrefix which is in generalState
this.props.getMobilePrefix();
 
```

## The challenge we are facing
While this way of calling the store works universally for functional and class components, we encountered some issues when developing a new template:  

### TypeScript
In `.tsx` components, regardless of whether they are `function` or `class` components, it becomes challenging to **familiar the types of each state and action**. This can be a challenge for new team members who just getting started with the template project. 

Unfortunately, since the `api-service` submodule is not under our management, we cannot entirely refactor the entire `rootReducer` into TypeScript.

### Teams are more familiar with React Hooks Development
In React Hooks, we can use `useDispatch` and `useSelector` to interact with the store, which generally leads to improved code readability.

```
// get account store
const account: AccountState = useSelector((state) => state.account);

// dispatch action
const dispatch = useDispatch();

const showLogin = (payload: LoginPayload) => {
  dispatch({ type: SHOW_LOGIN, payload });
},
```

## How we solve
We've introduced a custom hook, serving as an **abstraction layer** between `components` and the `Redux`. 
```
(prev)
component <===> redux

(now)
component <===> abstract layer <===> redux
```


Instead of directly interacting with Redux, components access store values and dispatch actions through this abstraction layer.

## Why we do this
> But...why?, why not just interact with redux just like before?

Well...good question

Remember aforementioned **typescript** problem? we cannot completely refactor the entire `rootReducer` in `api-service` into TypeScript, primarily because we do not maintain that submodule, and we are concerned about **causing a cascade of compile errors** in the existing projects if we transition the entire Redux codebase to TypeScript......

In this context, implementing "type-safe store" through an abstraction layer without modifying the existing code is a good choice.

## Example
Taking `store.state.account` as an example, here's a custom hook named `useAccountStore`:
```
export function useAccountStore() {
  const dispatch = useDispatch();

  // give account a type definition
  const account: AccountState = useSelector((state) => state.account);

  const updateMemberCardNo = useCallback(
  
    // account param also have type definition
    async (name: string, number: string) => {
      dispatch({
        type: UPDATECARDNO_BEGIN,
        loading: true,
      });
      try {
        const response = (await AccountService.AddRealName(
          name,
          number
        )) as AddRealNameResDto;
        // ......
    },
    []
  );
  // ......

  return {
    account,
    updateMemberCardNo,
    // ...
  };
}
```

`useAccountStore` consolidates all state and actions related to the `store.state.account`. 

Now, any component that needs to access the `store.state.account` value:
```
const Mobile = (props: Props) => {
  const history = useHistory();
  const location = useLocation();
  
  const accountStore = useAccountStore();
  const generalStore = useGeneralStore();
  const walletStore = useWalletStore();
  const uiStore = useUiStore();
  const gameStore = useGameStore();
  const inboxStore = useInboxStore();
  
  // ...
 
  // invoke predefined actions: 
  const myMethod = async () => {
    const responseToken = await accountStore.checkTokenIsValid();
  }
  
  
```

That it! when comparing the old code (`Wap`) and migrating its functionality to your new components, follow these steps if you come across store data from `mapStateToProps` and `mapDispatchToProps`:

1. Determine which category it belongs to, whether it's related to "account," "wallet," or "general."
2. Directly import the corresponding custom hook abstraction layer.

Almost every store state and action have already been moved to custom hooks. If you encounter any that haven't been migrated, please reach out to me.
