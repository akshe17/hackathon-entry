import { TextInput } from "./TextInput";
import { PasswordInput } from "./PasswordInput";

export function Step1({ data, set, errors }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <TextInput
          label="First Name"
          placeholder="Juan"
          value={data.firstName}
          onChange={(v) => set("firstName", v)}
          error={errors.firstName}
        />
        <TextInput
          label="Last Name"
          placeholder="dela Cruz"
          value={data.lastName}
          onChange={(v) => set("lastName", v)}
          error={errors.lastName}
        />
      </div>
      <TextInput
        label="Middle Name"
        placeholder="Santos (optional)"
        value={data.middleName}
        onChange={(v) => set("middleName", v)}
      />
      <TextInput
        label="Email Address"
        type="email"
        placeholder="juan@email.com"
        value={data.email}
        onChange={(v) => set("email", v)}
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
