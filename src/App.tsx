import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import './App.css'
import { ThemeProvider } from "../components/ui/theme-provider"
import { groupBy } from 'lodash'

function App() {

  const websites = [
    {
      name: "Tailwind",
      url: "https://tailwindcss.com/",
      icon: "https://tailwindcss.com/favicons/favicon.ico?v=3",
      category: "Development"
    },
    {
      name: "Github",
      url: "https://github.com/finout-io/finout-application",
      icon: "https://github.githubassets.com/favicons/favicon-dark.svg",
      category: "Development"
    },
    {
      name: "Figma",
      url: "https://www.figma.com/files/team/996753143204589606/project/95312930?fuid=1361759885931930407",
      icon: "https://static.figma.com/app/icon/1/favicon.svg",
      category: "Work"
    }
  ];

  const websitesByCategory = groupBy(websites, "category")


  return (
    <ThemeProvider>

      <div className="flex justify-center items-center">
        <Command className="rounded-lg border shadow-md w-96">
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {
              Object.keys(websitesByCategory).map((categoryName, index) => (
                <div>
                  <CommandGroup heading={categoryName}>
                    {
                      websitesByCategory[categoryName].map((website) => (
                        <CommandItem>
                          <div className="flex gap-2 size-full items-center cursor-pointer"
                            onClick={() => { window.open(website.url, "_blank") }}>
                            <img src={website.icon} className="size-4" />
                            <span>{website.name}</span>
                          </div>
                        </CommandItem>
                      ))
                    }
                  </CommandGroup>
                  {index < Object.keys(websitesByCategory).length - 1 && <CommandSeparator />}
                </div>
              ))
            }
          </CommandList>
        </Command>
      </div>
    </ThemeProvider>
  );
}

export default App;
