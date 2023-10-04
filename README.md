# view-effects
Package which applies custom behavior or effects to elements

#### Install
```bash
npm i view-effects
```

### How to apply effect

> `ViewEffect` is a term, which describes custom logic applied to views (HTMLElements), behavior, events responding and etc.

```ts
// Effect is created.
// (targetElement: HTMLElement)
const effect = new ViewEffectConstructor(targetElement, ...args);

effect.enable();
// Effect enabled...
effect.disable();
// Effect is disabled...
```

## ResizeViewEffect

Applies resizing effect to the `HTMLElement`, so it becomes resizeable
by the cursor.

*When effectController is grabbed, by moving the cursor effectTarget
will properly rescale, until it does not fit into the window.*

**Constructor**

```ts
new ResizeViewEffect(effectTarget: HTMLElement, effectController: HTMLElement = effectTarget): ViewEffect
```

- `effectTarget` View which will be resized by the effect.
- `effectController` If provided, resize effect will be achived by drabbing
this effectController element, and not effectTarget. By default,
equals to effectTarget.

For example, you can achive desktop window behavior, when window
is resized by grabbing its corner.

## DragViewEffect

Applies grabbing effect to the `HTMLElement`, which makes it
possible to drag it around the surface by the cursor.

*When effectController is grabbed, y moving the cursor effectTarget
will change it's position around the document.
(Don't forget to position to absolute/fixed)*

**Constructor**

```ts
new DragViewEffect(effectTarget: HTMLElement, effectController: HTMLElement = effectTarget): ViewEffect
```

- `effectTarget` View which shoud be dragged around the document.

- `effectController` If provided, dragging effect will be achived by drabbing
this effectController element, and not effectTarget. By default,
equals to effectTarget.

For example, you can achive desktop app window behavior, when window
is moved around the screen only when its header is being dragged by the cursor,
