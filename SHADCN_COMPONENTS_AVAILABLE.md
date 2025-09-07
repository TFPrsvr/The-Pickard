# Available shadcn/ui Components for The Pickard

## ✅ Already Implemented:
- **Tabs** - Used in vehicle dashboard
- **Card** - Used throughout the app
- **Button** - Primary buttons and actions
- **Input** - Form inputs and search
- **Select** - Dropdowns for vehicle selection
- **Badge** - Status indicators and tags

## 🚀 Additional Components We Can Add:

### Navigation & Layout
- **Navigation Menu** - Advanced dropdown menus
- **Menubar** - Top menu bar with multiple sections
- **Breadcrumb** - Page navigation trail
- **Pagination** - For search results
- **Sidebar** - Collapsible side navigation

### Data Display
- **Table** - Structured data display (perfect for parts lists)
- **Data Table** - Advanced sortable/filterable tables
- **Accordion** - Collapsible content sections
- **Collapsible** - Expandable content areas
- **Separator** - Visual content dividers

### Forms & Input
- **Form** - Complete form handling with validation
- **Checkbox** - Multi-select options
- **Radio Group** - Single-select options
- **Switch** - Toggle controls
- **Slider** - Range inputs (price ranges, years)
- **Textarea** - Multi-line text input
- **Combobox** - Searchable select dropdown
- **Command** - Command palette/search interface
- **Date Picker** - Calendar date selection

### Feedback & Status
- **Alert** - Important notifications
- **Alert Dialog** - Confirmation dialogs
- **Toast** - Temporary notifications
- **Progress** - Loading indicators
- **Skeleton** - Loading placeholders
- **Spinner** - Loading animations

### Interactive Elements
- **Dialog** - Modal windows
- **Sheet** - Slide-out panels
- **Popover** - Floating content panels
- **Hover Card** - Hover information cards
- **Tooltip** - Context help
- **Context Menu** - Right-click menus
- **Dropdown Menu** - Action menus

### Specialized Components
- **Calendar** - Full calendar interface
- **Carousel** - Image/content sliders
- **Scroll Area** - Custom scrollable areas
- **Resizable** - Resizable panels
- **Toggle Group** - Grouped toggle buttons
- **Avatar** - User profile images
- **Aspect Ratio** - Maintain image ratios

## 🎯 **RECOMMENDED for Automotive App:**

### 1. **Data Table** - Perfect for parts listings
```bash
npx shadcn@latest add data-table
```

### 2. **Dialog** - Vehicle selection modals
```bash
npx shadcn@latest add dialog
```

### 3. **Toast** - Success/error notifications
```bash
npx shadcn@latest add toast
```

### 4. **Alert** - Recall warnings and notices
```bash
npx shadcn@latest add alert
```

### 5. **Accordion** - FAQ sections and service procedures
```bash
npx shadcn@latest add accordion
```

### 6. **Command** - Advanced search interface
```bash
npx shadcn@latest add command
```

### 7. **Sheet** - Mobile-friendly side panels
```bash
npx shadcn@latest add sheet
```

### 8. **Progress** - Loading states for API calls
```bash
npx shadcn@latest add progress
```

### 9. **Slider** - Price ranges, year ranges
```bash
npx shadcn@latest add slider
```

### 10. **Hover Card** - Part information on hover
```bash
npx shadcn@latest add hover-card
```

## 🔥 **High-Impact Components for Automotive:**

### Parts Catalog Table
```tsx
// Using Data Table for comprehensive parts listings
<DataTable 
  columns={partsColumns}
  data={partsData}
  searchable={true}
  sortable={true}
  filterable={true}
/>
```

### Recall Alert System
```tsx
// Critical recall notifications
<Alert variant="destructive">
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Critical Safety Recall</AlertTitle>
  <AlertDescription>
    NHTSA Recall #23V-456: Brake system malfunction
  </AlertDescription>
</Alert>
```

### Service Procedure Accordion
```tsx
// Step-by-step repair guides from charm.li
<Accordion type="multiple">
  <AccordionItem value="step-1">
    <AccordionTrigger>Remove Engine Cover</AccordionTrigger>
    <AccordionContent>
      Detailed instructions with safety warnings...
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Advanced Vehicle Search Command
```tsx
// Command palette for quick vehicle/parts search
<Command>
  <CommandInput placeholder="Search vehicles, parts, or procedures..." />
  <CommandList>
    <CommandGroup heading="Vehicles">
      <CommandItem>2023 Honda Accord</CommandItem>
    </CommandGroup>
    <CommandGroup heading="Parts">
      <CommandItem>Engine Mount</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

### Mobile Parts Sheet
```tsx
// Mobile-friendly part details panel
<Sheet>
  <SheetTrigger>View Part Details</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Engine Mount - Front</SheetTitle>
    </SheetHeader>
    {/* Part compatibility, pricing, availability */}
  </SheetContent>
</Sheet>
```

Would you like me to implement any of these specific components for your automotive app?