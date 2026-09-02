"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/checkout/field";
import { useCart } from "@/components/cart/cart-provider";
import { deliverySchema, type DeliveryInput } from "@/lib/checkout-schema";
import { site } from "@/content/site";

export function CheckoutForm() {
  const { items } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DeliveryInput>({ resolver: zodResolver(deliverySchema) });

  async function onSubmit(values: DeliveryInput) {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Item, size and quantity only. The server re-prices every line.
        body: JSON.stringify({
          address: values,
          lines: items.map((i) => ({ kind: i.kind, id: i.id, size: i.size, qty: i.qty })),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; url?: string; error?: string };
      if (!res.ok || !data.url) {
        toast.error("Could not start checkout.", { description: data.error ?? "Please try again." });
        return;
      }
      // External URL, so a full navigation rather than the router.
      window.location.assign(data.url);
    } catch {
      toast.error("Something went wrong.", { description: "Please check your connection and try again." });
    }
  }

  /**
   * No auto-redirect on an empty cart: the server snapshot is always empty, so
   * a redirect here would fire during hydration for a buyer who does have items.
   */
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-carbon-700 bg-carbon-950 px-6 py-16 text-center">
        <p className="font-heading text-2xl text-carbon-50">Your cart is empty.</p>
        <p className="mt-2 text-carbon-300">Add a piece and it will show up here.</p>
        <Button asChild variant="secondary" className="mt-6">
          <Link href="/shop">Browse the shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <Field id="name" label="Full name" error={errors.name?.message}>
        <Input id="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" label="Email" error={errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
        </Field>
        <Field id="phone" label="Phone" error={errors.phone?.message}>
          <Input id="phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} {...register("phone")} />
        </Field>
      </div>

      <Field id="line1" label="Delivery address" error={errors.line1?.message}>
        <Input id="line1" autoComplete="street-address" placeholder="House and street" aria-invalid={!!errors.line1} aria-describedby={errors.line1 ? "line1-error" : undefined} {...register("line1")} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="city" label="City" error={errors.city?.message}>
          <Input id="city" autoComplete="address-level2" aria-invalid={!!errors.city} aria-describedby={errors.city ? "city-error" : undefined} {...register("city")} />
        </Field>
        <Field id="postalCode" label="Postal code" error={errors.postalCode?.message}>
          <Input id="postalCode" autoComplete="postal-code" inputMode="numeric" aria-invalid={!!errors.postalCode} aria-describedby={errors.postalCode ? "postalCode-error" : undefined} {...register("postalCode")} />
        </Field>
      </div>

      <Field id="notes" label="Delivery notes" optional error={errors.notes?.message}>
        <Textarea id="notes" rows={3} placeholder="A landmark, a gate code, or a better time to deliver." {...register("notes")} />
      </Field>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Taking you to payment…" : "Continue to payment"}
      </Button>
      <p className="text-center text-sm text-carbon-400">
        Card payment is handled by Stripe. We deliver across {site.contact.city} and the rest of Pakistan.
      </p>
    </form>
  );
}
