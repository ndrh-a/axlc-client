# Smart Recipe Analyzer

A modern, responsive web application that analyzes your available ingredients and generates personalized recipe suggestions using AI. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🍳 **Smart Ingredient Analysis**: Input your available ingredients and get recipe suggestions
- 📱 **Responsive Design**: Beautiful UI that works perfectly on desktop and mobile
- 🌙 **Dark Mode Support**: Automatic dark/light theme switching
- ⚡ **Fast & Modern**: Built with Next.js 15 and Tailwind CSS 4
- 🔄 **Real-time Updates**: Dynamic ingredient management with add/remove functionality
- 📊 **Recipe Details**: Complete recipes with ingredients, instructions, timing, and dietary info

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Tabler Icons
- **API**: Next.js API Routes
- **Deployment**: Ready for Vercel, Netlify, or any hosting platform

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd axlc-client
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Add Ingredients**: Enter your available ingredients in the input fields
2. **Generate Recipe**: Click "Find Recipe" to get AI-powered suggestions
3. **View Recipe**: Browse the complete recipe with ingredients, instructions, and details
4. **Clear & Repeat**: Clear the form to try with different ingredients

## API Integration

The app connects to your backend endpoint `/recipe/analyze` for recipe generation. The backend can be integrated with:

- **OpenAI GPT**: For intelligent recipe generation
- **Claude AI**: For detailed cooking instructions
- **Custom ML Models**: For specialized cuisine recommendations

### Backend Endpoint

```typescript
POST /recipe/analyze
{
  "ingredients": ["chicken", "tomatoes", "pasta"],
  "dietary": ["gluten-free"],
  "cuisine": "italian",
  "difficulty": "easy"
}
```

## Project Structure

```
app/
├── globals.css               # Global styles and Tailwind config
├── layout.tsx                # Root layout component
└── page.tsx                  # Main application page
```

## Customization

### Adding New AI Providers

1. Update the API route in `app/api/recipes/route.ts`
2. Integrate with your preferred AI service
3. Modify the response format as needed

### Styling

- Colors and themes can be customized in `app/globals.css`
- Component styles use Tailwind CSS classes for easy modification
- Dark mode is automatically handled with CSS variables

### Adding Features

- **Dietary Preferences**: Extend the form to include dietary restrictions
- **Cuisine Selection**: Add cuisine type selection
- **Recipe History**: Implement local storage for saved recipes
- **Social Sharing**: Add recipe sharing functionality

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

The app is compatible with any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Future Enhancements

- [ ] User authentication and recipe saving
- [ ] Image generation for recipes
- [ ] Nutritional information
- [ ] Recipe rating and reviews
- [ ] Shopping list generation
- [ ] Meal planning calendar
- [ ] Integration with grocery delivery services

---

Built with ❤️ using Next.js and Tailwind CSS
