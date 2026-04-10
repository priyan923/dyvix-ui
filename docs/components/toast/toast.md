---
title: Dyvix Toast
---

# Dyvix Toast

A config-driven animated notifaction system consists of global container and indivisual toast nodes.

## Attributes

### Toast container

The container holds & manages toast settings for all outgoing toasts

- `position`
  - : `string`. The position where the container docks. Supported type are : `top-right`, `top-left`, `bottom-right`, `bottom-left`.
- `duration`
  - : `number`. The default duration is `5000` ms. Controls how the duration that indivisual toast is showed.
- `animation`
  - : `string`. Controls the entrance animation of the indivisual toast. Defaults to `zoom`.

### Toast

- `message`
  - : `string`. The content of the notification.

## Example

```jsx
import { DyvixToastContainer, dyvixToast } from 'dyvix-ui';

function notify()
{
  dyvixToast.success('This a new message');
}

return (
  <>
    <DyvixToastContainer position='top-right' duration={5000} animation='fade'/>
    <button onClick={notify}>Notify</button>
  </>
)
```
