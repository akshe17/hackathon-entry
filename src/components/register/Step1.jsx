import { TextInput } from "./TextInput";
import { PasswordInput } from "./PasswordInput";
import { User, Mail } from "lucide-react";
export function Step1({ data, set, errors }) {
  return (
    <div className="flex flex-col gap-4">
      <TextInput
        label="Full Name"
        placeholder="Juan dela Cruz"
        value={data.name}
        onChange={(v) => set("name", v)}
        icon={User}
        error={errors.name}
      />
      <TextInput
        label="Email Address"
        type="email"
        placeholder="juan@email.com"
        value={data.email}
        onChange={(v) => set("email", v)}
        icon={Mail}
        error={errors.email}
      />
      <PasswordInput
        label="Password"
        placeholder="Create a strong password (min. 8 chars)"
        value={data.password}
        onChange={(v) => set("password", v)}
        error={errors.password}
      />
      <PasswordInput
        label="Confirm Password"
        placeholder="Repeat your password"
        value={data.confirm}
        onChange={(v) => set("confirm", v)}
        error={errors.confirm}
      />
    </div>
  );
}
