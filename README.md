
1. I suppose that passing props to specific components doesn't really make that much sense since we could utilize multiple `view-models`. Generic components on the other hand 
should not make use of `view-models`.
2. Subscriptions, <https://github.com/QuantumArt/mobx-form-validation-kit/blob/master/src/form-control.ts>

```java
public class MyViewModel extends ViewModel {
    // Expose screen UI state
    private MutableLiveData<List<User>> users;
    public LiveData<List<User>> getUsers() {
        if (users == null) {
            users = new MutableLiveData<List<User>>();
            loadUsers();
        }
        return users;
    }

    // Handle business logic
    private void loadUsers() {
        // Do an asynchronous operation to fetch users.
    }
}
```
