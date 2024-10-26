'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from './scroll-area';
import { useMemo } from 'react';
import _ from 'lodash';

export type ComboboxOptions = {
  value: string;
  label: string;
};

type Mode = 'single' | 'multiple';

interface ComboboxProps {
  mode?: Mode;
  options: ComboboxOptions[];
  selected: string | string[];
  className?: string;
  placeholder?: string;
  onChange?: (event: string | string[]) => void;
  onCreate?: (value: string) => void;
}

export default function Combobox({
  options,
  selected,
  className,
  placeholder,
  mode = 'single',
  onChange,
  onCreate,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState<string>('');

  const displayOptions = useMemo(() => {
    const displayOptions = options.map(option => ({ ...option, onCreate: false }));

    if (query && !options.find(option => option.value === query)) {
      displayOptions.push({ value: query, label: `Create: ${query}`, onCreate: true });
    }

    return displayOptions;
  }, [options, query]);

  return (
    <div className={cn('block', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            key={'combobox-trigger'}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selected && selected.length > 0 ? (
              <div className="relative mr-auto flex flex-grow flex-wrap items-center overflow-hidden">
                <span>
                  {mode === 'multiple' && Array.isArray(selected)
                    ? selected
                        .map((selectedValue: string) => options.find(item => item.value === selectedValue)?.label)
                        .join(', ')
                    : mode === 'single' && options.find(item => item.value === selected)?.label}
                </span>
              </div>
            ) : (
              (placeholder ?? 'Select Item...')
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 max-w-sm p-0">
          <Command
            filter={(value, search) => {
              if (value.includes(search)) return 1;
              return 0;
            }}
            // shouldFilter={true}
          >
            <CommandInput
              placeholder={placeholder ?? 'Cari Item...'}
              value={query}
              onValueChange={(value: string) => setQuery(value)}
            />
            <CommandEmpty
              onClick={() => {
                if (onCreate) {
                  onCreate(query);
                  setQuery('');
                }
              }}
              className="flex cursor-pointer items-center justify-center gap-1"
            >
              <div>Create: </div>
              <div className="block max-w-48 truncate text-primary">{query}</div>
            </CommandEmpty>
            <ScrollArea>
              <div className="max-h-80">
                <CommandGroup>
                  <CommandList>
                    {displayOptions.map(option => (
                      <CommandItem
                        key={option.label}
                        value={option.label}
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        onSelect={currentValue => {
                          if (onChange) {
                            if (mode === 'multiple' && Array.isArray(selected)) {
                              onChange(
                                selected.includes(option.value)
                                  ? selected.filter(item => item !== option.value)
                                  : [...selected, option.value],
                              );
                            } else {
                              if (option.onCreate && onCreate) {
                                onCreate(option.value);
                              } else {
                                onChange(option.value);
                              }
                            }
                          }
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            _.castArray(selected).includes(option.value) ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </div>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
