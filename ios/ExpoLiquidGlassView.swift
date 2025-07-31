import ExpoModulesCore
import SwiftUI

class ExpoLiquidGlassViewProps: ExpoSwiftUI.ViewProps {
    @Field var cornerRadius: CGFloat = 5
    @Field var type: String
    @Field var cornerStyle: String
    @Field var tint: String
}

struct ExpoLiquidGlassView: ExpoSwiftUI.View, ExpoSwiftUI.WithHostingView {
  let props: ExpoLiquidGlassViewProps
  
    var body: some View {
        if #available(iOS 26.0, *) {
            Children().glassEffect(getGlassEffect(from: props.type,color: props.tint),in: .rect(cornerRadius: props.cornerRadius,style: getCornerRadiusStyle(from: props.cornerStyle)))
        
        } else  {
            Children()
        }
    }
}

private func getCornerRadiusStyle(from style: String) -> RoundedCornerStyle {
    switch style.lowercased() {
    case "continuous":
      return .continuous
    case "circular":
      return .circular
    default:
      return .continuous // Default fallback
    }
  }


@available(iOS 26.0, *)
private func getGlassEffect(from type: String, color: String) -> Glass {
  switch type.lowercased() {
  case "clear":
      return .clear
  case "identity":
      return .identity
  case "regular":
      return .regular
  case "interactive":
      return .regular.interactive()
  case "tint":
      return .regular.tint(Color(hex: color))
  default:
    return .clear
  }
}


extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3:
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6:
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8:
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }

        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}
