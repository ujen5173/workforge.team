import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "~/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useOnboard } from "~/stores/hooks";
import type { Industry, TeamSize } from "~/stores/slices/onboard.slice";
import { step2Schema } from "./schema";
import TeamSizePicker from "./team-size-picker";
import { INDUSTRIES } from "./types";

const CompanyProfileIndustry = () => {
  const { industry, website, teamSize, description, nextStep } = useOnboard();

  const form = useForm({
    defaultValues: {
      industry,
      teamSize,
      website,
      description,
    },
    onSubmit: ({ value }) => {
      const parsingResult = step2Schema.safeParse(value);

      if (parsingResult.success) return nextStep(parsingResult.data);

      toast.error(
        "Form fields are not validated properly. Please check the values again. ",
      );
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
      className="space-y-4"
    >
      <FieldGroup>
        <form.Field name="industry">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Industry</FieldLabel>
                <Select
                  value={field.state.value ?? undefined}
                  onValueChange={(value: Industry) => field.handleChange(value)}
                >
                  <SelectTrigger
                    className={`w-full ${!field.state.value ? "text-muted-foreground" : ""}`}
                    id={field.name}
                    aria-invalid={isInvalid}
                  >
                    <SelectValue placeholder="Select your industry…" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((ind) => (
                      <SelectItem key={ind} value={ind}>
                        {ind}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>
      <FieldGroup>
        <form.Field name="teamSize">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>Team size</FieldLabel>
                <TeamSizePicker
                  value={field.state.value ?? ""}
                  onChange={(value: TeamSize) => field.handleChange(value)}
                />
                <FieldDescription className="italic">
                  WorkForge is optimised for small teams under 50 people.
                </FieldDescription>
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>
      <FieldGroup>
        <form.Field
          name="website"
          validators={{
            onChange: ({ value }) => {
              if (!value) return undefined;
              const result = z.string().url().safeParse(value);
              return result.success
                ? undefined
                : "Please enter a valid URL including https://.";
            },
          }}
        >
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Company Website{" "}
                  <span className="font-normal text-muted-foreground">
                    (optional)
                  </span>
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="url"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="https://acme.com"
                  iconPlacement="left"
                  className="tracking-wide"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>
      <FieldGroup>
        <form.Field name="description">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const charCount = field.state.value.length;
            return (
              <Field data-invalid={isInvalid}>
                <div className="flex justify-between items-center">
                  <FieldLabel htmlFor={field.name}>
                    Short Description{" "}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </FieldLabel>
                  <span
                    className={`text-xs tabular-nums ${
                      charCount > 260
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}
                  >
                    {charCount}/280
                  </span>
                </div>
                <textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  rows={3}
                  placeholder="A one-liner about what your company does…"
                  className={`border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring w-full resize-none rounded-md border px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-1 ${
                    isInvalid ? "border-destructive" : ""
                  }`}
                />
                <FieldDescription className="italic">
                  Shown on your company profile and team invitations.
                </FieldDescription>
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>
      <div className="mt-6 mb-3">
        <Button className="w-full" type="submit">
          Continue
        </Button>
      </div>
    </form>
  );
};

export default CompanyProfileIndustry;
