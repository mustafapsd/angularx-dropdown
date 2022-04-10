<img src="https://img.shields.io/npm/dt/angularx-dropdown?style=for-the-badge">

<br> <br>
This is a basic package for create dropdown with a simple directive

<h1> Links </h1>


Npm Link: <a href="https://www.npmjs.com/package/angularx-dropdown">angularx-dropdown</a>

Demo Link: <a href="https://mustafapsd.github.io/angularx-dropdown">https://mustafapsd.github.io/angularx-dropdown</a>

<br>
<h1> Usage </h1>

`dropdownTemplate` This must be an `ng-template`.

`size` Dropdown container's size. `sm: 230px (default) | md: 300px | lg: 400px` Default: `sm` - Optional

`classList`: ` string | string[]` - Optional

`alignment`: `left | right` Default: `left` - Optional

`disableCloseOnClickOutside`: `boolean` Default: `false` - Optional

<br> <br>

`app.module.ts`

```
...

import { AngularxDropdownModule } from 'angularx-dropdown';

@NgModule({

imports: [

...

AngularxDropdownModule

],

})
```

<br>
<h1> Example </h1>

```
<div>
    <button
      ngDropdown
      [dropdownTemplate]="dropdownTemplate"
      size="sm"
      classList="custom-class"
    >
      Dropdown Button
    </button>
  
  <ng-template #dropdownTemplate>
      Dropdown content

      <button dropdown-close>
        Custom Close Button
      </button>
  </ng-template>
```
