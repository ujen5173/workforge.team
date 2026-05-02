"use client";

import { useForm, useStore } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { toSlug } from "~/helpers/global";
import { useOnboard } from "~/stores/hooks";
import LogoUploader from "./logo-uploader";
import { slugSchema, step1Schema } from "./schema";

const CompanyProfile = () => {
  const { companyName, spirit, slug, logo, nextStep } = useOnboard();
  const [slugEdited, setSlugEdited] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      companyName,
      slug,
      logo,
      spirit,
    },
    onSubmit: ({ value }) => {
      const parsingResult = step1Schema.safeParse(value);

      if (parsingResult.success) {
        return nextStep(parsingResult.data);
      }

      toast.error(
        "Form fields are not validated properly. Please check the values again. ",
      );
    },
  });

  const setLogoPreview = (logo: File | null) => {
    form.setFieldValue("logo", logo);
  };

  // Watch a logo
  const companyLogo = useStore(form.store, (state) => state.values.logo);
  const companySlug = useStore(form.store, (state) => state.values.slug);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
      className="space-y-4"
    >
      <FieldGroup>
        <Field>
          <FieldLabel>Company Logo</FieldLabel>
          <LogoUploader
            preview={companyLogo}
            companyName={companyName}
            onChange={setLogoPreview}
          />
        </Field>
      </FieldGroup>

      <FieldGroup>
        <form.Field name="companyName">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Company Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    if (!slugEdited) {
                      form.setFieldValue("slug", toSlug(e.target.value));
                    }
                  }}
                  aria-invalid={isInvalid}
                  placeholder="Acme Corporation"
                  autoComplete="organization"
                  className="tracking-wide"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>

      <FieldGroup>
        <form.Field
          name="slug"
          validators={{
            onChange: ({ value }) => {
              const result = slugSchema.safeParse(value);
              return result.success
                ? undefined
                : result.error.issues[0]?.message;
            },
          }}
        >
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Workspace URL</FieldLabel>
                <div className="flex items-center">
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      setSlugEdited(true);
                      field.handleChange(e.target.value);
                    }}
                    aria-invalid={isInvalid}
                    placeholder="acme"
                    className="rounded-r-none tracking-wide"
                  />
                  <span className="flex items-center bg-muted px-3 border border-border border-l-0 rounded-r-md h-10 text-muted-foreground text-sm select-none">
                    .workforge.team
                  </span>
                </div>
                <FieldDescription className="italic">
                  Your team logs in at{" "}
                  <span className="font-medium text-primary not-italic">
                    {companySlug ?? "your-company"}.workforge.team
                  </span>
                </FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>

      <FieldGroup>
        <form.Field name="spirit">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const charCount = field.state.value.length;
            return (
              <Field data-invalid={isInvalid}>
                <div className="flex justify-between items-center">
                  <FieldLabel htmlFor={field.name}>
                    Tagline / Spirit{" "}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </FieldLabel>
                  <span
                    className={`text-xs tabular-nums ${
                      charCount > 72
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}
                  >
                    {charCount}/80
                  </span>
                </div>
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Build fast, ship often, stay human."
                  className="italic"
                />
                <FieldDescription className="italic">
                  A short motto that captures your company&apos;s spirit.
                </FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
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

export default CompanyProfile;
