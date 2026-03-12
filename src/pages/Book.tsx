import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, ArrowLeft, Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSearchParams, Link } from "react-router-dom";

const packages = [
  {
    id: "photo-walk",
    name: "Seattle Photo Walk",
    price: "$150",
    duration: "60 min",
    photos: "10 photos",
  },
  {
    id: "adventure",
    name: "Adventure Portrait Session",
    price: "$275",
    duration: "90 min",
    photos: "20 photos",
    popular: true,
  },
  {
    id: "vip",
    name: "VIP Private Experience",
    price: "$550",
    duration: "2-3 hrs",
    photos: "40+ photos",
  },
];

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "4:00 PM",
];

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const Book = () => {
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get("package");

  const [selectedPackage, setSelectedPackage] = useState<string>(
    preselected || ""
  );
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormValid = Boolean(
    selectedPackage && date && time && name.trim() && email.trim()
  );

  const missingFields = [
    !selectedPackage && "package",
    !date && "date",
    !time && "time",
    !name.trim() && "name",
    !email.trim() && "email",
  ].filter(Boolean) as string[];

  const handleSubmit = async () => {
    if (!isFormValid) {
      toast.error(`Please complete: ${missingFields.join(", ")}`);
      return;
    }
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        "create-checkout",
        {
          body: {
            packageId: selectedPackage,
            customerName: name,
            customerEmail: email,
            sessionDate: format(date!, "yyyy-MM-dd"),
            sessionTime: time,
            notes,
          },
        }
      );

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container max-w-2xl">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft size={16} /> Back to home
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
            className="text-3xl sm:text-4xl mb-2"
          >
            Book Your Session
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.05 }}
            className="text-muted-foreground mb-10"
          >
            Choose your package, pick a date, and you're all set.
          </motion.p>

          {/* Package Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.1 }}
            className="mb-8"
          >
            <Label className="text-sm font-bold mb-3 block">
              1. Choose your package
            </Label>
            <div className="grid gap-3">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={cn(
                    "relative flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all",
                    selectedPackage === pkg.id
                      ? "border-primary bg-accent"
                      : "border-border hover:border-primary/40"
                  )}
                >
                  <div>
                    <span className="font-bold text-foreground">
                      {pkg.name}
                    </span>
                    <span className="block text-sm text-muted-foreground">
                      {pkg.duration} · {pkg.photos}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-foreground">
                      {pkg.price}
                    </span>
                    {selectedPackage === pkg.id && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check size={14} className="text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  {pkg.popular && (
                    <span className="absolute -top-2.5 left-4 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Most Popular
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Date & Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.15 }}
            className="mb-8"
          >
            <Label className="text-sm font-bold mb-3 block">
              2. Pick a date & time
            </Label>
            <div className="flex flex-col sm:flex-row gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full sm:w-[240px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) =>
                      d < new Date() || d.getDay() === 0 || d.getDay() === 2
                    }
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>

              <div className="flex flex-wrap gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setTime(slot)}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium border transition-all",
                      time === slot
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-primary/40 text-foreground"
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.2 }}
            className="mb-8"
          >
            <Label className="text-sm font-bold mb-3 block">
              3. Your details
            </Label>
            <div className="grid gap-3">
              <Input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Textarea
                placeholder="Any special requests? (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </motion.div>

          {/* Submit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.25 }}
          >
            <Button
              size="lg"
              className="w-full text-base font-bold"
              disabled={!isFormValid || loading}
              onClick={handleSubmit}
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" size={18} />
              ) : null}
              {loading ? "Redirecting to payment..." : "Continue to Payment"}
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-3">
              You'll be redirected to Stripe for secure payment
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Book;
