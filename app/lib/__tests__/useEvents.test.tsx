import { renderHook, waitFor } from "@testing-library/react";
import { useEvents } from "../hooks/useEvents";

// Mock Firebase
jest.mock("@/app/lib/firebase/client", () => ({ db: {} }));

const mockUnsubscribe = jest.fn();
const mockOnSnapshot = jest.fn();

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  onSnapshot: (...args: unknown[]) => mockOnSnapshot(...args),
  Timestamp: {
    now: jest.fn(() => ({ seconds: 1700000000, nanoseconds: 0 })),
  },
}));

const mockEvents = [
  {
    id: "evt-1",
    name: "Trail Run 10K",
    eventDate: { seconds: 1800000000, nanoseconds: 0 },
    registrationFee: 300,
    category: "trail",
    status: "published",
  },
  {
    id: "evt-2",
    name: "City Bike Race",
    eventDate: { seconds: 1900000000, nanoseconds: 0 },
    registrationFee: 500,
    category: "biking",
    status: "published",
  },
];

describe("useEvents", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockOnSnapshot.mockImplementation((_query, onNext) => {
      onNext({
        docs: mockEvents.map((e) => ({
          id: e.id,
          data: () => e,
        })),
      });
      return mockUnsubscribe;
    });
  });

  it("returns loading=true initially then false after data loads", async () => {
    const { result } = renderHook(() => useEvents());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeNull();
  });

  it("returns events from Firestore snapshot", async () => {
    const { result } = renderHook(() => useEvents());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.events).toHaveLength(2);
    expect(result.current.events[0].name).toBe("Trail Run 10K");
  });

  it("unsubscribes from Firestore on unmount", async () => {
    const { result, unmount } = renderHook(() => useEvents());
    await waitFor(() => expect(result.current.loading).toBe(false));
    unmount();
    expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
  });

  it("sets error state when Firestore throws", async () => {
    mockOnSnapshot.mockImplementation((_query, _onNext, onError) => {
      onError(new Error("Firestore unavailable"));
      return mockUnsubscribe;
    });

    const { result } = renderHook(() => useEvents());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Firestore unavailable");
    expect(result.current.events).toHaveLength(0);
  });
});
