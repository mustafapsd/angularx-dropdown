<img src="https://img.shields.io/npm/dt/angularx-dropdown?style=for-the-badge">

<br>

This is a basic package for create dropdown with a simple directive

<br>
<h1> Usage </h1>

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

`dropdownTemplate` This must be an `ng-template`.

`size` Dropdown container's size. `sm: 230px (default) | md: 300px | lg: 400px` Default: `sm` - Optional

`classList`: ` string | string[]` - Optional

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
  </ng-template>
```
