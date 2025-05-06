using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WeaponControlSystem.MOI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class fourth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Weapons_Officers_OfficerId",
                table: "Weapons");

            migrationBuilder.DropIndex(
                name: "IX_Weapons_OfficerId",
                table: "Weapons");

            migrationBuilder.DropColumn(
                name: "OfficerId",
                table: "Weapons");

            migrationBuilder.AlterColumn<string>(
                name: "OfficerBadgeNo",
                table: "Weapons",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "BadgeNo",
                table: "Officers",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Officers_BadgeNo",
                table: "Officers",
                column: "BadgeNo");

            migrationBuilder.CreateIndex(
                name: "IX_Weapons_OfficerBadgeNo",
                table: "Weapons",
                column: "OfficerBadgeNo");

            migrationBuilder.CreateIndex(
                name: "IX_Officers_BadgeNo",
                table: "Officers",
                column: "BadgeNo",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Weapons_Officers_OfficerBadgeNo",
                table: "Weapons",
                column: "OfficerBadgeNo",
                principalTable: "Officers",
                principalColumn: "BadgeNo",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Weapons_Officers_OfficerBadgeNo",
                table: "Weapons");

            migrationBuilder.DropIndex(
                name: "IX_Weapons_OfficerBadgeNo",
                table: "Weapons");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Officers_BadgeNo",
                table: "Officers");

            migrationBuilder.DropIndex(
                name: "IX_Officers_BadgeNo",
                table: "Officers");

            migrationBuilder.AlterColumn<string>(
                name: "OfficerBadgeNo",
                table: "Weapons",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<int>(
                name: "OfficerId",
                table: "Weapons",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "BadgeNo",
                table: "Officers",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.CreateIndex(
                name: "IX_Weapons_OfficerId",
                table: "Weapons",
                column: "OfficerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Weapons_Officers_OfficerId",
                table: "Weapons",
                column: "OfficerId",
                principalTable: "Officers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
