import type { Meta, StoryObj } from "@storybook/react";
import { palette, gradients, spacing, tokens } from "@kuroshio-lab/styles";

const meta: Meta = {
  title: "Design System/Tokens",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const ColorSwatch = ({ name, hex }: { name: string; hex: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className="w-24 h-24 rounded-lg border-2 border-gray-200 shadow-md"
      style={{ backgroundColor: hex }}
    />
    <p className="text-xs font-semibold text-center">{name}</p>
    <p className="text-xs text-gray-500 font-mono">{hex}</p>
  </div>
);

const GradientSwatch = ({
  name,
  gradient,
}: {
  name: string;
  gradient: string;
}) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className="w-32 h-20 rounded-lg border-2 border-gray-200 shadow-md"
      style={{ backgroundImage: gradient }}
    />
    <p className="text-xs font-semibold text-center">{name}</p>
  </div>
);

export const Colors: Story = {
  render: () => (
    <div className="p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Design Tokens - Colors</h1>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          Primary (Brand)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {Object.entries(palette.primary).map(([key, value]) => (
            <ColorSwatch key={key} name={`Primary ${key}`} hex={value} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          Neutral (Grays)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {Object.entries(palette.neutral).map(([key, value]) => (
            <ColorSwatch key={key} name={`Neutral ${key}`} hex={value} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          Semantic - Success
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {Object.entries(palette.success).map(([key, value]) => (
            <ColorSwatch key={key} name={`Success ${key}`} hex={value} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          Semantic - Warning
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {Object.entries(palette.warning).map(([key, value]) => (
            <ColorSwatch key={key} name={`Warning ${key}`} hex={value} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          Semantic - Error
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {Object.entries(palette.error).map(([key, value]) => (
            <ColorSwatch key={key} name={`Error ${key}`} hex={value} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">Accent</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {Object.entries(palette.accent).map(([key, value]) => (
            <ColorSwatch key={key} name={`Accent ${key}`} hex={value} />
          ))}
        </div>
      </section>
    </div>
  ),
};

export const Gradients: Story = {
  render: () => (
    <div className="p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Design Tokens - Gradients</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(gradients).map(([key, value]) => (
          <GradientSwatch key={key} name={key} gradient={value} />
        ))}
      </div>
    </div>
  ),
};

export const SpacingScale: Story = {
  render: () => (
    <div className="p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Design Tokens - Spacing</h1>
      <div className="space-y-6">
        {Object.entries(spacing).map(([key, value]) => (
          <div key={key} className="flex items-center gap-4">
            <div className="w-32">
              <p className="font-semibold text-gray-900">{key}</p>
              <p className="text-xs text-gray-500">{value}</p>
            </div>
            <div
              className="bg-gradient-kerama rounded"
              style={{ width: value, height: "32px" }}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};
