# 3D Furniture Room Designer

An interactive web application for designing and customizing room layouts with furniture in both 2D and 3D views.

## Features

- Interactive 3D and 2D room visualization with toggle between views
- Drag-and-drop furniture placement with mouse movement control
- Furniture customization (colors, sizes) through intuitive controls
- Save, edit, and delete functionality for room layouts
- Room dimension and wall color customization through sliders
- Collision detection to prevent furniture clipping through walls
- Model library with various furniture types (sofas, chairs, tables, etc.)

## Tech Stack

- React with TypeScript
- Three.js and React Three Fiber for 3D rendering
- TailwindCSS for styling
- Zustand for state management

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Usage Instructions

### Adding Furniture

1. Browse furniture items in the sidebar
2. Click the "+" button on a furniture item to add it to the room
3. The furniture will appear in the center of the room

### Moving Furniture

1. Select a furniture item by clicking on it
2. Drag with your mouse to reposition it in the room
3. Furniture cannot be moved outside the room boundaries

### Customizing Furniture

When a furniture item is selected, a control panel appears with options to:

1. Rotate the furniture: Use the rotation buttons to turn the item
2. Resize the furniture: Use the +/- buttons to scale the item up or down
3. Change color: Use the color picker to select a new color
4. Delete: Remove the furniture from the room

### Room Customization

In the Room tab of the sidebar:

1. Adjust room dimensions (width, length, height) using sliders
2. Change wall and floor colors using color pickers
3. Reset to default settings with the reset button

### Saving and Loading Layouts

1. Enter a name for your layout in the header
2. Click "Save Layout" to store your design
3. View saved layouts in the Layouts tab of the sidebar
4. Click on a saved layout to load it
5. Delete layouts you no longer need

### Switching Views

Toggle between 3D and 2D views using the buttons in the top right corner.

## Customizing the Application

### Adding New Furniture Models

To add new furniture models:

1. Add model files (.glb format) to the `public/models/` directory
2. Add thumbnail images to the `public/thumbnails/` directory
3. Update the `defaultFurniture` array in `src/data/defaultFurniture.ts`:

```typescript
{
  type: 'your_furniture_type',
  name: 'Display Name',
  defaultColor: '#hexcolor',
  defaultScale: { x: 1, y: 1, z: 1 },
  model: '/models/your_model.glb',
  thumbnail: '/thumbnails/your_thumbnail.png',
  category: 'category_name',
  description: 'Short description of the furniture'
}
```

### Modifying the Room Settings

To change the default room settings:

1. Update the `defaultRoom` object in `src/store/StateProvider.tsx`
2. Adjust the min/max values for sliders in `src/components/sidebar/RoomControls.tsx`

### Styling the Application

The application uses TailwindCSS for styling:

1. Modify the color scheme in `tailwind.config.js`
2. Update component styles in their respective files

## License

This project is available as open source under the terms of the MIT License.