---
title: Dyvix Input
---

# Dyvix Input

A config-driven animated input component with support for default coloring styles.

## Attributes

- `type`
  - : `string`. Determines inputs type. Defaults to `text`.
- `placeholder`
  - : `string`. The text displayed when the input is empty.
- `autoComplete`
  - : `string`. The autocomplete hint passed to the underlying input element.
- `background`
  - : `string`. Controls the input background color and feel.
- `color`
  - : `string`. Controls the input text color.
- `animation`
  - : `string`. Controls the entrance animation of the input. See the [Animation Presets](/guide/animations) for a full list.
- `className`
  - : `string`. Determines a custom class for your input, allowing more control for the developer.
- `name`
  - : `string`. The name attribute for input element, used for form submission.
- `id`
  - : `string`. The id attribute for input element, used for accessibility and label association.
- `disabled`
  - : `boolean`. Disable the input when true.
- `aria-label`
  - : `string`. Accessible label for the input element.
- `onFocus`
  - : `function`. A callback function triggered when the input gains focus.
- `onBlur`
  - : `function`. A callback function triggered when the input loses focus.
- `onChange`
  - : `function`. A callback function triggered upon input value change.

## Try it

<InputPlayground />

## Example

```jsx
import { DyvixInput, DYVIX_GLOBAL_ANIMATION } from 'dyvix-ui';
function InputExample() {
  return (
    <DyvixInput
      animation={DYVIX_GLOBAL_ANIMATION.AURORA}
      type="text"
      placeholder="Enter your name"
      onChange={(e) => {
        console.log(e.target.value);
      }}
    />
  );
}
```
